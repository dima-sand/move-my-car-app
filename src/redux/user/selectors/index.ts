import { IAppState } from '@/models/state/state';
import { IEditVehicle } from '@/models/state/state/user/car';

export const getUserInfoSelector = (state: IAppState) => state.user.userInfo!;

export const getVehicleInfoModalStateSelector = (state: IAppState) =>
  state.core.vehicleInfoModalState;

export const getVehicleInfoToEditSelector = (
  state: IAppState
): IEditVehicle => state.core.vehicleInfoModalState.modifyingVehicleInfo;

export const getUserCarsSelector = (state: IAppState) => state.user.userInfo!.cars;

export const getSelectedCarSelector = (state: IAppState) => state.user.userInfo!.cars[state.user.selectedCarIndex];
