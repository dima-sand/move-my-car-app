import { LocaleLang } from "@/models/locales";


export class CarModel {
  static getCarInfoToEdit(car: ICar): IEditVehicle {
    return {
      carName: car.carName,
      carNumber: car.carNumber,
      autoMessage: car.carPrefs.autoMessage,
      isVisibleCarName: car.carPrefs.isVisibleCarName,
      isVisibleCarNumber: car.carPrefs.isVisibleCarNumber,
    }
  }

  static getCarInfoByEditedFields(car: ICar, editedFields: IEditVehicle): ICar {
    return {
      ...car,
      carName: editedFields.carName,
      carNumber: editedFields.carNumber,
      carPrefs: {
        ...car.carPrefs,
        autoMessage: editedFields.autoMessage,
        isVisibleCarName: editedFields.isVisibleCarName,
        isVisibleCarNumber: editedFields.isVisibleCarNumber,
      }
    }
  }
}

export interface ICar {
  id: string;
  carName: string;
  carNumber: string;
  index: number;
  carLocation: ICarLocation | null;
  carCalls: ICarCall[];
  carPrefs: ICarPreferencies;
}

export type IEditVehicle =
  Omit<ICar, 'carLocation' | 'carCalls' | 'index' | 'id' | 'carPrefs'> & ICarPreferencies;

export interface ICarLocation {
  lat: number;
  lng: number;
}

export interface ICarPreferencies {
  isVisibleCarName: boolean;
  isVisibleCarNumber: boolean;
  autoMessage: string;
}

export interface ICarCall {
  timeStamp: string;
  message: string;
  id: string;
  lang: LocaleLang;
  isRead: boolean;
  chat: any[];
}
