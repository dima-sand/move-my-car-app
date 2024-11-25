import { IVehicleInfoModalState, VehicleInfoModalMode } from '@/models/state/state/core';
import { IEditVehicle } from '@/models/state/state/user/car';

export const defaultEditVehicleInfo: IEditVehicle = {
  carName: '',
  carNumber: '',
  autoMessage: '',
  isVisibleCarName: false,
  isVisibleCarNumber: false,
};

export const defaultVehicleInfoModalState: IVehicleInfoModalState = {
  mode: VehicleInfoModalMode.Closed,
  modifyingVehicleIndex: null,
  modifyingVehicleInfo: defaultEditVehicleInfo,
};
