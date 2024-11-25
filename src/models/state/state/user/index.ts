// import { LocaleLang } from '../../locales';

import { LocaleLang } from "@/models/locales";
import { ICar } from "./car";

export interface IUserState {
  isLoggedIn: boolean;
  userInfo: IUserModel | null;
  selectedCarIndex: number;
  userUpdatingState: IUserUpdatingState;
}

export class UserModel {

  static getUserDataForRegister(data: IUserRegister): IUserRegister {
    return {
      userName: data.userName,
      role: data.role ?? UserRole.User,
      refreshTokenList: data.refreshTokenList ?? [],
      cars: data.cars ?? [],
      prefs: data.prefs ?? {},
    };
  }

  static getUserFromDB = (user: any): IUserModel => ({
    userName: user.userName,
    role: user.role,
    cars: user.cars,
    prefs: user.prefs,
  }); 
}

export interface IUserModel {
  userName: string;
  role: UserRole;
  cars: ICar[];
  prefs: IUserPreferencies;
}



interface IUserRegister
  extends Omit<IUserModel, '_id' | 'role' | 'refreshTokenList' | 'cars'> {
  role?: UserRole;
  refreshTokenList?: string[] | [];
  cars?: ICar[] | [];
}

enum UserRole {
  User = 'user',
  Admin = 'admin',
}


export interface IUserUpdatingState {
  isConnected: boolean;
  error: string | null;
}

export interface IUserPreferencies {
  lang: LocaleLang;
}

