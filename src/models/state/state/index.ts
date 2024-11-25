import { ICoreState } from "./core";
import { IExternalState } from "./external";
import { IUserState } from "./user";

export interface IAppState {
  core: ICoreState;
  user: IUserState;
  external: IExternalState;
}

