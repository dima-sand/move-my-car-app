import { RoutePaths } from "@/constants/routes";
import { IAction, IPayloadAction } from "../../models/state/actions";
import { SignInModalMode } from "../../models/state/state/core"


export const enum CoreActionTypes {
  NavigateTo = 'core/NAVIGATE_TO',
  RouteChange = 'core/ROUTE_CHANGE',
  TestingAction = 'core/TESTING_ACTION',
  ChangeSignInModalMode = 'core/CHANGE_SIGNIN_MODAL_MODE',
  ChangeVehicleInfoModalMode = 'core/CHANGE_VEHICLE_INFO_MODAL_MODE',
  // ShowErrorMessage = 'core/SHOW_ERROR_MESSAGE',
};

export type ActionTypes =
  | IPayloadAction<CoreActionTypes.NavigateTo, RoutePaths>
  | IPayloadAction<CoreActionTypes.RouteChange, string>
  | IAction<CoreActionTypes.TestingAction>
  | IPayloadAction<CoreActionTypes.ChangeSignInModalMode, SignInModalMode>
  | IPayloadAction<CoreActionTypes.ChangeVehicleInfoModalMode, number | null>
  // | IPayloadAction<CoreActionTypes.ShowErrorMessage, string | null | undefined>
  ;

export const navigateTo = (url: RoutePaths): ActionTypes => ({
  type: CoreActionTypes.NavigateTo,
  payload: url,
});

export const changeSignInModalMode = (payload: SignInModalMode): ActionTypes => ({
  type: CoreActionTypes.ChangeSignInModalMode,
  payload,
});

export const testingAction = (): ActionTypes => ({
  type: CoreActionTypes.TestingAction
});

export const routeChange = (url: string): ActionTypes => ({
  type: CoreActionTypes.RouteChange,
  payload: url,
});

export const changeVehicleInfoModalMode = (payload: number | null): ActionTypes => ({
  type: CoreActionTypes.ChangeVehicleInfoModalMode,
  payload,
});


// export const showErrorMessage = (payload: string): ActionTypes => ({
//   type: CoreActionTypes.ShowErrorMessage,
//   payload,
// })