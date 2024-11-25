import { createSlice } from '@reduxjs/toolkit';
import {
  IUserModel,
  IUserState,
  UserModel,
} from '../../models/state/state/user';
import Cookies from 'js-cookie';
import { CookieNames } from '../../constants/common';
import { IPayloadAction } from '../../models/state/actions';

const initialState: IUserState = {
  userInfo: null,
  isLoggedIn: false,
  selectedCarIndex: 0,
  userUpdatingState: {
    isConnected: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setUserInfoAction(state, action) {
      state.userInfo = UserModel.getUserFromDB(action.payload);
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    logout(state) {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.selectedCarIndex = 0;
    },
    connect: state => {
      state.userUpdatingState.isConnected = true;
    },
    disconnect: state => {
      state.userUpdatingState.isConnected = false;
    },
    connectionError: (state, action: IPayloadAction<string, any>) => {
      state.userUpdatingState.error = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
