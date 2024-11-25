import { IAction, IPayloadAction } from '../../models/state/actions';

export const enum ExternalActionTypes {
  FetchUserInfoExternal = 'external/FETCH_USER_INFO_EXTERNAL',
}

export type ActionTypes = IPayloadAction<
  ExternalActionTypes.FetchUserInfoExternal,
  string
>;

export const fetchUserInfoExternal = (payload: string): ActionTypes => ({
  type: ExternalActionTypes.FetchUserInfoExternal,
  payload,
});
