import { UnknownAction } from "@reduxjs/toolkit";
import { Epic } from "redux-observable";
import { IAppState } from "../state";

export type MyEpic = Epic<UnknownAction, UnknownAction, IAppState>;
