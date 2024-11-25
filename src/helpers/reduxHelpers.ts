import { Action, UnknownAction } from '@reduxjs/toolkit';
import { catchError, concat, Observable, of, OperatorFunction } from 'rxjs';
import { coreActions } from '../redux/core';

// , S extends UnknownAction
export const callWithLoader$ = <T extends Action>(
  action$: Observable<T>,
  catchError$?: OperatorFunction<T, UnknownAction>
  // catchError$?: Observable<S>,
  // loaderTitle?: string
) =>
  concat(
    of(coreActions.showLoader()),
    action$.pipe(
      catchError$
        ? catchError$
        : catchError(err => of(coreActions.showErrorMessage(err)))
    ),
    of(coreActions.hideLoader())
  );
