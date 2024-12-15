import { IRegisterPayload } from '@/api/services/auth/registration';
import { IAction, IPayloadAction } from '@/models/state/actions';
import { ILoginData } from '@/api/services/auth/login';
import { IChangePasswordData } from '@/api/services/user/changePassword';
import { ISaveCarLocationPayload } from '@/api/services/user/carServices/saveCarLocation';
import { ICar } from '@/models/state/state/user/car';

export const enum UserActionTypes {
  FetchUserInfo = 'user/FETCH_USER_INFO',
  FetchLogin = 'user/FETCH_LOGIN',
  CheckLogin = 'user/CHECK_LOGIN',
  FetchLogout = 'user/FETCH_LOGOUT',
  FetchRegistration = 'user/FETCH_REGISTRATION',
  FetchChangePassword = 'user/FETCH_CHANGE_PASSWORD',
  UpdateUserInfoWS = 'user/UPDATE_USER_INFO_WS',
  SaveNotificationToken = 'user/SAVE_NOTIFICATION_TOKEN',
  SaveCarLocation = 'user/SAVE_CAR_LOCATION',

  ToggleCarCallIsRead = 'user/TOGGLE_CAR_CALL_IS_READ',
  DeleteCarCall = 'user/DELETE_CAR_CALL',
  AddNewCar = 'user/ADD_NEW_CAR',
  SaveVehicleInfo = 'user/SAVE_VEHICLE_INFO',
}

export type ActionTypes =
  | IAction<UserActionTypes.FetchUserInfo>
  | IPayloadAction<UserActionTypes.FetchLogin, ILoginData>
  | IAction<UserActionTypes.FetchLogout>
  | IPayloadAction<UserActionTypes.FetchRegistration, IRegisterPayload>
  | IPayloadAction<UserActionTypes.FetchChangePassword, IChangePasswordData>
  | IAction<UserActionTypes.UpdateUserInfoWS>
  | IAction<UserActionTypes.SaveNotificationToken>
  | IPayloadAction<UserActionTypes.SaveCarLocation, ISaveCarLocationPayload | null>
  | IPayloadAction<UserActionTypes.ToggleCarCallIsRead, {carId:string, callId: string}>
  | IPayloadAction<UserActionTypes.DeleteCarCall, {carId:string, callId: string}>
  | IPayloadAction<UserActionTypes.AddNewCar, ICar>
  | IAction<UserActionTypes.SaveVehicleInfo>
  | IAction<UserActionTypes.CheckLogin>

export const fetchLogin = (payload: ILoginData): ActionTypes => ({
  type: UserActionTypes.FetchLogin,
  payload,
});

export const checkLogin = () : ActionTypes => ({
  type: UserActionTypes.CheckLogin,
})

export const fetchRegistration = (payload: IRegisterPayload): ActionTypes => ({
  type: UserActionTypes.FetchRegistration,
  payload,
});

export const fetchUserInfo = (): ActionTypes => ({
  type: UserActionTypes.FetchUserInfo,
});

export const fetchChangePassword = (payload: IChangePasswordData): ActionTypes => ({
  type: UserActionTypes.FetchChangePassword,
  payload,
});

export const updateUserInfoWS = (): ActionTypes => ({
  type: UserActionTypes.UpdateUserInfoWS,
});

export const saveNotificationToken = (): ActionTypes => ({
  type: UserActionTypes.SaveNotificationToken,
});

export const saveCarLocation = (payload: ISaveCarLocationPayload | null): ActionTypes => ({
  type: UserActionTypes.SaveCarLocation,
  payload,
});

export const fetchLogout = (): ActionTypes => ({
  type: UserActionTypes.FetchLogout,
});


export const toggleCarCallIsRead = (payload: {carId:string, callId: string}): ActionTypes => ({
  type: UserActionTypes.ToggleCarCallIsRead,
  payload,
});

export const deleteCarCall = (payload: {carId:string, callId: string}): ActionTypes => ({
  type: UserActionTypes.DeleteCarCall,
  payload,
});

export const addNewCar = (payload: ICar): ActionTypes => ({
  type: UserActionTypes.AddNewCar,
  payload,
});

export const saveVehicleInfo = (): ActionTypes => ({
  type: UserActionTypes.SaveVehicleInfo,
});
