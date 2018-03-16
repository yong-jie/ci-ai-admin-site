import { call, put, takeLatest } from "redux-saga/effects";

import { AuthenticationActions, authenticateUserSuccess, authenticateUserFailure } from './AuthenticationActionCreator';
import { checkAuthenticationStatus } from '../api';

export function* handleAuthenticateUser() {
  let outcome;
  try {
    outcome = yield call(checkAuthenticationStatus);
  } catch (error) {
    // Connection-related error.
    yield put(authenticateUserFailure())
    // TODO: Redirect to login page.
    return;
  }

  const { success, result } = outcome.body;
  if (!success) {
    // Server failed unexpectedly.
    yield put(authenticateUserFailure())
    // TODO: Redirect to login page.
    return;
  }

  if (!result.authenticated) {
    // User is not authenticated.
    yield put(authenticateUserFailure())
    // TODO: Redirect to login page.
    return;
  }
  
  yield put(authenticateUserSuccess(result));
  return;
}

export const authenticationSagas = [
  takeLatest(AuthenticationActions.FETCH_AUTHENTICATION_PENDING, handleAuthenticateUser),
];
