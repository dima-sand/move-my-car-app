import { createSlice } from '@reduxjs/toolkit';
import {
  ICoreState,
  SignInModalErrorType,
  SignInModalMode,
  IVehicleInfoModalState,
} from '../../models/state/state/core';
import { IPayloadAction } from '../../models/state/actions';
import {
  defaultVehicleInfoModalState,
} from '@/constants/components/carInfoModal';

const initialState: ICoreState = {
  loading: false,
  errorMessage: undefined,
  infoMessage: '',
  signInModalState: {
    mode: SignInModalMode.Closed,
    errorType: null,
  },
  vehicleInfoModalState: defaultVehicleInfoModalState,
};

export enum StorageKeysCore {
  Core = 'core',
}

const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setSignInModalMode(state, action) {
      state.signInModalState.mode = action.payload;
    },
    setVehicleInfoModalMode(
      state,
      action: IPayloadAction<string, IVehicleInfoModalState>
    ) {
      state.vehicleInfoModalState = action.payload;
    },
    closeVehicleInfoModal(state) {
      state.vehicleInfoModalState = defaultVehicleInfoModalState;
    },
    updateVehicleInfoField(
      state,
      action: IPayloadAction<string, { [key: string]: string | boolean }>
    ) {
      const newVehicleInfo = {
        ...state.vehicleInfoModalState.modifyingVehicleInfo,
        ...action.payload,
      };
      state.vehicleInfoModalState = {
        ...state.vehicleInfoModalState,
        modifyingVehicleInfo: newVehicleInfo,
      };
    },
    setSignInModalErrorType(
      state,
      action: IPayloadAction<string, SignInModalErrorType>
    ) {
      state.signInModalState.errorType = action.payload;
    },
    showErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    resetSignInModalState(state) {
      state.signInModalState = {
        mode: SignInModalMode.Closed,
        errorType: null,
      };
    },
    showLoader(state) {
      state.loading = true;
    },
    hideLoader(state) {
      state.loading = false;
    },
    setInfoMessage(state, action) {
      state.infoMessage = action.payload;
    }
  },
});

export const coreActions = coreSlice.actions;

export default coreSlice.reducer;
