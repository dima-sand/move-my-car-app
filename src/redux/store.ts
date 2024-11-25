import { configureStore, Action } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import coreEpics from './core/epics';
import core from './core';
import { IAppState } from '../models/state/state';
import userEpics from './user/epics';
import user from './user';
import external from './external';

const rootEpic = combineEpics(coreEpics, userEpics); // userEpics

export const makeStore = () => {
  const epicMiddleware = createEpicMiddleware<Action, Action, IAppState>();

  const store = configureStore({
    reducer: {
      core,
      user,
      external,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(epicMiddleware),
  });

  epicMiddleware.run(rootEpic);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
