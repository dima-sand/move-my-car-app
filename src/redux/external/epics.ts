import { combineEpics, ofType } from 'redux-observable';
import { MyEpic } from '../../models/state/epics';
import { ExternalActionTypes } from './actions';
import { catchError, EMPTY, from, of, switchMap } from 'rxjs';
import { callWithLoader$ } from '../../helpers/reduxHelpers';
import getInfoExternalService from '../../api/services/external/callUser';
import { externalActions } from '.';
import { AxiosError } from 'axios';

// const fetchUserInfo: MyEpic = action$ =>
//   action$.pipe(
//     ofType(ExternalActionTypes.FetchUserInfoExternal),
//     switchMap(({ payload }: { payload: string }) =>
//       callWithLoader$(
//         from(getInfoExternalService(payload)).pipe(
//           switchMap(({ data }) => {
//             if (data.success) {
//               return of(externalActions.setCalledUserInfo(data.data));
//             } else
//               return of(
//                 externalActions.setError(data.data.message)
//                 // coreActions.showErrorMessage('Something went wrong'),
//               );
//           })
//         ),
//         // of(externalActions.setError('Something went wrong')),
//         catchError(err => {
//           if (err instanceof AxiosError) {
//             return of(
//               externalActions.setError(
//                 err.response?.data.message ?? 'Something went wrong'
//               )
//             );
//           } else return of(externalActions.setError(err));
//         })
//       )
//     )
//   );

const externalEpics = combineEpics();

export default externalEpics;
