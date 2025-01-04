import { combineEpics, ofType } from 'redux-observable';
import { EMPTY, of, switchMap } from 'rxjs';
import { CoreActionTypes } from './actions';
import { MyEpic } from '../../models/state/epics';
import { RoutePaths } from '@/constants/routes';
import { navigateToServerAction } from '@/app/actions';
import { coreActions } from '.';
import { VehicleInfoModalMode } from '@/models/state/state/core';
import { defaultEditVehicleInfo } from '@/constants/components/carInfoModal';
import { CarModel, IEditVehicle } from '@/models/state/state/user/car';

const changeVehicleInfoModalModeEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    ofType(CoreActionTypes.ChangeVehicleInfoModalMode),
    switchMap(({ payload: index }: { payload: number | null }) => {
      let modifyingVehicleInfo: IEditVehicle = defaultEditVehicleInfo;

      if (index !== null) {
        modifyingVehicleInfo = CarModel.getCarInfoToEdit(
          state$.value.user.userInfo!.cars.find(car => car.index === index)!
        );
      }

      return of(
        coreActions.setVehicleInfoModalMode({
          mode:
            index === null
              ? VehicleInfoModalMode.Create
              : VehicleInfoModalMode.Edit,
          modifyingVehicleIndex: index,
          modifyingVehicleInfo: modifyingVehicleInfo,
        })
      );
    })
  );

const routeChangeEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(CoreActionTypes.NavigateTo),
    switchMap(({ payload }: { payload: RoutePaths }) => {
      navigateToServerAction(payload);
      return EMPTY;
    })
  );

const coreEpics = combineEpics(changeVehicleInfoModalModeEpic, routeChangeEpic);

export default coreEpics;
