import { combineEpics, ofType } from 'redux-observable';
import {
  catchError,
  concat,
  EMPTY,
  from,
  of,
  switchMap,
} from 'rxjs';
import {
  saveNotificationToken,
  UserActionTypes,
} from '../actions';
import getInfoService from '../../../api/services/user/getInfo';
import { userActions } from '..';
import { coreActions } from '../../core';
import { callWithLoader$ } from '../../../helpers/reduxHelpers';
import registrationService, {
  IRegisterPayload,
} from '../../../api/services/auth/registration';
import loginService, { ILoginData } from '../../../api/services/auth/login';
import {
  SignInModalMode,
} from '../../../models/state/state/core';
import { MyEpic } from '../../../models/state/epics';

import { RoutePaths } from '../../../constants/routes';
import saveMessagingTokenService from '../../../api/services/user/saveMessagingToken';
import logoutService from '@/api/services/auth/logout';
import { navigateTo, navigateTo as navigateToAction } from '../../core/actions';
import { fetchToken } from '../../../../firebase';
import saveCarLocationService, { ISaveCarLocationPayload } from '@/api/services/user/carServices/saveCarLocation';
import carEpics from './carEpics';

const registrationEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.FetchRegistration),
    switchMap(({ payload }: { payload: IRegisterPayload }) =>
      from(
        callWithLoader$(
          from(registrationService(payload)).pipe(
            switchMap(({ data }) => {
              if (data.success) {
                return concat(
                  of(coreActions.setSignInModalMode(SignInModalMode.Closed)),
                  of(userActions.setIsLoggedIn(true)),
                  of(navigateTo(RoutePaths.AuthPage))
                );
              } else
                return of(
                  coreActions.showErrorMessage(
                    'Something went wrong, try again later'
                  )
                );
            })
          )
        )
      )
    )
  );

const loginEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.FetchLogin),
    switchMap(({ payload }: { payload: ILoginData }) =>
      callWithLoader$(
        from(loginService(payload)).pipe(
          switchMap(({ data }) => {
            if (data.success) {
              return concat(
                of(coreActions.setSignInModalMode(SignInModalMode.Closed)),
                of(userActions.setIsLoggedIn(true)),
                // of(fetchUserInfo()),
                of(saveNotificationToken()),
                of(navigateTo(RoutePaths.AuthPage))
              );
            } else
              return of(
                coreActions.showErrorMessage(
                  'Something went wrong trying to login, try again later'
                )
              );
          })
        )
      )
    )
  );

const logoutEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.FetchLogout),
    switchMap(() =>
      callWithLoader$(
        from(logoutService()).pipe(
          switchMap(() =>
            concat(
              of(userActions.logout()),
              of(navigateToAction(RoutePaths.InitialPage))
            )
          )
        )
      )
    )
  );

const saveNotificationTokenEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.SaveNotificationToken),
    switchMap(() => {
      const generateToken$ = from(fetchToken());
      return callWithLoader$(
        from(generateToken$).pipe(
          switchMap(messagingToken => {
            if (messagingToken) {
              return from(saveMessagingTokenService(messagingToken)).pipe(
                switchMap(({ data }) => {
                  if (data.success) {
                    localStorage.setItem('messagingToken', messagingToken);
                    return EMPTY;
                  } else {
                    return of(
                      coreActions.showErrorMessage(
                        'Something went wrong, try again later'
                      )
                    );
                  }
                })
              );
            } else
              return of(
                coreActions.showErrorMessage(
                  'Something went wrong, try again later'
                )
              );
          })
        )
      );
    })
  );

const fetchUserInfoEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.FetchUserInfo),
    switchMap(() =>
      callWithLoader$(
        from(getInfoService()).pipe(
          switchMap(({ data }) => {
            if (data.success) {
              return concat(
                of(userActions.setUserInfoAction(data.data)),
                of(userActions.setIsLoggedIn(true)),
                of(navigateTo(RoutePaths.DashboardPage))
              );
            } else
              return concat(
                of(userActions.setUserInfoAction(null)),
                of(userActions.setIsLoggedIn(false))
                // of(
                //   coreActions.showErrorMessage(
                //     data.message
                //       ? data.message
                //       : 'Something went wrong, try again later'
                //   )
                // ),
                // status === 401
                //   ? of(navigateTo(RoutePaths.WelcomePage))
                //   : EMPTY,
              );
          })
        ),
        catchError(() => of(userActions.logout()))
      )
    )
  );

// const fetchChangePasswordEpic: MyEpic = action$ =>
//   action$.pipe(
//     ofType(UserActionTypes.FetchChangePassword),
//     switchMap(({ payload }: { payload: IChangePasswordData }) =>
//       from(
//         callWithLoader$(
//           from(changePasswordService(payload)).pipe(
//             switchMap(({ data }) => {
//               if (data.success) {
//                 return of(coreActions.resetSignInModalState());
//               } else
//                 return of(
//                   coreActions.showErrorMessage(
//                     'Something went wrong, try again later'
//                   )
//                 );
//             }),
//             catchError(() => {
//               return of(
//                 coreActions.setSignInModalErrorType(
//                   SignInModalErrorType.WrongPassword
//                 )
//               );
//             })
//           )
//         )
//       )
//     )
//   );


const saveCarLocationEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    ofType(UserActionTypes.SaveCarLocation),
    switchMap(({ payload }: { payload: ISaveCarLocationPayload }) =>
      callWithLoader$(
        from(saveCarLocationService(payload)).pipe(
          switchMap(({ data }) => {
            if (data.success) {
              const response = data.data;
              const updatedUser = structuredClone(state$.value.user.userInfo!);
              const updatedCar = updatedUser.cars.find(
                car => car._id === response?.carId
              )!;
              updatedCar.carLocation = response?.carLocation;
              return of(userActions.setUserInfoAction(updatedUser));
            } else
              return of(
                coreActions.showErrorMessage(
                  'Something went wrong, try again later'
                )
              );
          })
        )
      )
    )
  );

const userEpics = combineEpics(
  //  fetchChangePasswordEpic,
  fetchUserInfoEpic,
  loginEpic,
  logoutEpic,
  // // pushNotificationEpic,
  registrationEpic,
  // updateUserInfoWSEpic,
  // testEpic,
  saveNotificationTokenEpic,
  saveCarLocationEpic,

  carEpics,
);

export default userEpics;
