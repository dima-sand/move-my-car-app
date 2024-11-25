export interface IExternalState {
  error?: string;
  calledUserInfo?: ICalledUserInfo;
}



export interface ICalledUserInfo {
  userName?: string;
  carNumber?: string;
  carName?: string;
}