import { combineEpics, ofType } from 'redux-observable';
import { catchError, EMPTY, from, of, switchMap, concatMap } from 'rxjs';
import { UserActionTypes } from '../actions';
import getInfoService from '../../../api/services/user/getInfo';
import { userActions } from '..';
import { coreActions } from '../../core';
import { callWithLoader$ } from '../../../helpers/reduxHelpers';
import { SignInModalErrorType } from '../../../models/state/state/core';
import { MyEpic } from '../../../models/state/epics';

import { RoutePaths } from '../../../constants/routes';
import saveMessagingTokenService from '../../../api/services/user/saveMessagingToken';
import { navigateTo } from '../../core/actions';
import { fetchToken } from '../../../../firebase';
import saveCarLocationService, {
  ISaveCarLocationPayload,
} from '@/api/services/user/carServices/saveCarLocation';
import carEpics from './carEpics';
import changePasswordService, {
  IChangePasswordData,
} from '@/api/services/user/changePassword';
import { authEpics } from './authEpics';

const saveNotificationTokenEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.SaveNotificationToken),
    switchMap(() => {
      return callWithLoader$(
        from(fetchToken()).pipe(
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
          concatMap(({ data }) => {
            if (data.success) {
              return [
                userActions.setUserInfoAction(data.data),
                userActions.setIsLoggedIn(true),
                navigateTo(RoutePaths.DashboardPage),
              ];
            } else {
              return [
                userActions.setUserInfoAction(null),
                userActions.setIsLoggedIn(false),
                navigateTo(RoutePaths.InitialPage),
              ];
            }
          })
        ),
        catchError(() => of(userActions.logout()))
      )
    )
  );

const fetchChangePasswordEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.FetchChangePassword),
    switchMap(({ payload }: { payload: IChangePasswordData }) =>
      callWithLoader$(
        from(changePasswordService(payload)).pipe(
          switchMap(({ data }) => {
            if (data.success) {
              return of(coreActions.resetSignInModalState());
            } else
              return of(
                coreActions.showErrorMessage(
                  'Something went wrong, try again later'
                )
              );
          }),
          catchError(() => {
            return of(
              coreActions.setSignInModalErrorType(
                SignInModalErrorType.WrongPassword
              )
            );
          })
        )
      )
    )
  );

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
  // local epics:
  fetchChangePasswordEpic,
  fetchUserInfoEpic,
  saveNotificationTokenEpic,
  saveCarLocationEpic,
  // imported epics:
  authEpics,
  carEpics
);

export default userEpics;
