import { MyEpic } from "@/models/state/epics";
import { combineEpics, ofType } from "redux-observable";
import { saveNotificationToken, UserActionTypes } from "../actions";
import { concatMap, from, map, switchMap } from "rxjs";
import { callWithLoader$ } from "@/helpers/reduxHelpers";
import logoutService from "@/api/services/auth/logout";
import { userActions } from "..";
import loginService, { ILoginData } from "@/api/services/auth/login";
import { coreActions } from "@/redux/core";
import { SignInModalMode } from "@/models/state/state/core";
import { RoutePaths } from "@/constants/routes";
import { navigateTo } from "@/redux/core/actions";
import registrationService, { IRegisterPayload } from "@/api/services/auth/registration";





const loginEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.FetchLogin),
    switchMap(({ payload }: { payload: ILoginData }) =>
      callWithLoader$(
        from(loginService(payload)).pipe(
          concatMap(({ data }) => {
            if (data.success) {
              return [
                coreActions.setSignInModalMode(SignInModalMode.Closed),
                userActions.setIsLoggedIn(true),
                saveNotificationToken(),
                navigateTo(RoutePaths.AuthPage),
              ];
            } else
              return [
                coreActions.showErrorMessage(
                  'Something went wrong trying to login, try again later'
                ),
              ];
          })
        )
      )
    )
  );

const checkLoginEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.CheckLogin),
    concatMap(() => {
      return [
        // coreActions.showLoader(),
        navigateTo(RoutePaths.AuthPage),
        userActions.setLogInChecked(),
      ];
    })
  );

const logoutEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.FetchLogout),
    switchMap(() =>
      callWithLoader$(
        from(logoutService()).pipe(map(() => userActions.logout()))
      )
    )
  );

const registrationEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.FetchRegistration),
    switchMap(({ payload }: { payload: IRegisterPayload }) =>
      from(
        callWithLoader$(
          from(registrationService(payload)).pipe(
            concatMap(({ data }) => {
              if (data.success) {
                return [
                  coreActions.setSignInModalMode(SignInModalMode.Closed),
                  userActions.setIsLoggedIn(true),
                  saveNotificationToken(),
                  navigateTo(RoutePaths.AuthPage),
                ];
              } else
                return [
                  coreActions.showErrorMessage(
                    'Something went wrong, try again later'
                  ),
                ];
            })
          )
        )
      )
    )
  );

export const authEpics = combineEpics(
  loginEpic,
  checkLoginEpic,
  logoutEpic,
  registrationEpic,
);