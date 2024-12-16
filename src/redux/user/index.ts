import { createSlice } from '@reduxjs/toolkit';
import { IUserState, UserModel } from '../../models/state/state/user';

const initialState: IUserState = {
  userInfo: null,
  isLoggedIn: false,
  selectedCarIndex: 0,
  logInChecked: false,
};

const userSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setUserInfoAction(state, action) {
      if (action.payload === null) {
        state.userInfo = null;
      } else {
        state.userInfo = UserModel.getUserFromDB(action.payload);
      }
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    logout(state) {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.selectedCarIndex = 0;
    },
    setLogInChecked(state) {
      state.logInChecked = true;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
