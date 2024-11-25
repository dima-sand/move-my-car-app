import { UnknownAction } from "@reduxjs/toolkit";

export interface IAction<T extends string> extends UnknownAction {
  type: T
};

export interface IPayloadAction<T extends string, P> extends IAction<T> {
  payload: P
}
