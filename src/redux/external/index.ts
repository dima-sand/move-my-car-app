import { createSlice } from "@reduxjs/toolkit";
import { IPayloadAction } from "../../models/state/actions";
import { ICalledUserInfo, IExternalState } from "../../models/state/state/external";

const initialState: IExternalState = {
  calledUserInfo: undefined,
  error: undefined,
};

const externalSlice = createSlice({
  name: 'external',
  initialState,
  reducers: {
    setCalledUserInfo(state, action: IPayloadAction<string, ICalledUserInfo>) {
      state.calledUserInfo = action.payload;
    },
    clearCalledUserInfo(state) {
      state.calledUserInfo = undefined;
    },
    setError(state, action: IPayloadAction<string, string>) {
      state.error = action.payload;
    }
  },
});

export const externalActions = externalSlice.actions;

export default externalSlice.reducer;