import { callWithLoader$ } from '@/helpers/reduxHelpers';
import { MyEpic } from '@/models/state/epics';
import { combineEpics, ofType } from 'redux-observable';
import { concat, EMPTY, from, of, switchMap } from 'rxjs';
import { UserActionTypes } from '../actions';
import toggleCarCallIsReadService from '@/api/services/user/carServices/toggleCarCallIsRead';
import { userActions } from '..';
import deleteCarCallService from '@/api/services/user/carServices/deleteCarCall';
import addNewCarService from '@/api/services/user/carServices/addNewCar';
import saveVehicleInfoService from '@/api/services/user/carServices/saveVehicleInfo';
import {
  getUserCarsSelector,
  getVehicleInfoModalStateSelector,
} from '../selectors';
import { CarModel } from '@/models/state/state/user/car';
import { coreActions } from '@/redux/core';

const toggleCarCallIsReadEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.ToggleCarCallIsRead),
    switchMap(({ payload }) =>
      callWithLoader$(
        from(toggleCarCallIsReadService(payload)).pipe(
          switchMap(({ data }) => {
            if (data.success) {
              return of(userActions.setUserInfoAction(data.data));
            } else {
              return EMPTY;
            }
          })
        )
      )
    )
  );

const deleteCarCallEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.DeleteCarCall),
    switchMap(({ payload }) =>
      callWithLoader$(
        from(deleteCarCallService(payload)).pipe(
          switchMap(({ data }) => {
            if (data.success) {
              return of(userActions.setUserInfoAction(data.data));
            } else {
              return EMPTY;
            }
          })
        )
      )
    )
  );

const saveVehicleInfoEpic: MyEpic = (action$, state$) =>
  action$.pipe(
    ofType(UserActionTypes.SaveVehicleInfo),
    switchMap(() => {
      const { modifyingVehicleIndex, modifyingVehicleInfo } =
        getVehicleInfoModalStateSelector(state$.value);
      const userCars = getUserCarsSelector(state$.value);

      const editedCar = CarModel.getCarInfoByEditedFields(
        userCars.find(car => car.index === modifyingVehicleIndex)!,
        modifyingVehicleInfo
      );
      return callWithLoader$(
        from(saveVehicleInfoService(editedCar)).pipe(
          switchMap(({ data }) => {
            if (data.success) {
              return concat(
                of(coreActions.closeVehicleInfoModal()),
                of(userActions.setUserInfoAction(data.data)),
              );
            } else {
              return EMPTY;
            }
          })
        )
      );
    })
  );

const addNewCarEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(UserActionTypes.AddNewCar),
    switchMap(({ payload }) =>
      callWithLoader$(
        from(addNewCarService(payload)).pipe(
          switchMap(({ data }) => {
            if (data.success) {
              return of(userActions.setUserInfoAction(data.data));
            } else {
              return EMPTY;
            }
          })
        )
      )
    )
  );

const carEpics = combineEpics(
  toggleCarCallIsReadEpic,
  deleteCarCallEpic,
  addNewCarEpic,
  saveVehicleInfoEpic
);

export default carEpics;
