import { IEditVehicle } from "../user/car";

export interface ICoreState {
  loading: boolean;
  errorMessage?: string;
  infoMessage: string;
  signInModalState:{
    mode: SignInModalMode;
    errorType: SignInModalErrorType | null;
  };
  vehicleInfoModalState: IVehicleInfoModalState;
  qrGeneratorModalState: boolean;
}

export interface IVehicleInfoModalState {
  mode: VehicleInfoModalMode;
  modifyingVehicleIndex: number | null;
  modifyingVehicleInfo: IEditVehicle;
}

export enum SignInModalMode {
  Login = 'login',
  Register = 'register',
  Closed = 'closed',
  ChangePassword = 'changePassword',
};

export enum SignInModalErrorType {
  WrongPassword = 'wrongPassword',
  WrongUsername = 'wrongUsername',
  WrongRepeatPassword = 'wrongRepeatPassword',
  PasswordsNotMatch = 'passwordsNotMatch',
  ServerError = 'serverError',
}

export enum VehicleInfoModalMode {
  Closed = 'closed',
  Edit = 'edit',
  Create = 'create',
}
