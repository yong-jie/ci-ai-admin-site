import { call, put, takeLatest } from 'redux-saga/effects';

import { RouteActions } from './RouteActionCreator';
import history from '../history';

export function* handleChangeRoute(action) {
  const path = action.payload;
  yield call(history.push, path);
  return;
}

export const routeSagas = [
  takeLatest(RouteActions.CHANGE_ROUTE_PENDING, handleChangeRoute),
];
