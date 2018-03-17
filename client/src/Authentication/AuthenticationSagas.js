import { call, put, takeLatest } from 'redux-saga/effects';

import { AuthenticationActions, authenticateUserSuccess, authenticateUserFailure } from './AuthenticationActionCreator';
import { changeRoute } from '../Routing/RouteActionCreator';

import { checkAuthenticationStatus, login } from '../api';

export function* handleAuthenticateUser() {
  let outcome;
  try {
    outcome = yield call(checkAuthenticationStatus);
  } catch (error) {
    // Connection-related error.
    yield put(authenticateUserFailure());
    yield put(changeRoute('/login'));
    return;
  }

  const { success, result } = outcome.body;
  if (!success) {
    // Server failed unexpectedly.
    yield put(authenticateUserFailure());
    yield put(changeRoute('/login'));
    return;
  }

  if (!result.authenticated) {
    // User is not authenticated.
    yield put(authenticateUserFailure());
    yield put(changeRoute('/login'));
    return;
  }
  
  yield put(authenticateUserSuccess(result));
  return;
}

export function* handleLoginUser(action) {
  const { username, password, expiry } = action.payload;

  let outcome;
  try {
    outcome = yield call(login, username, password, expiry);
  } catch (err) {
    // Connection-related error.
    // TODO: Handle connection error.
    return;
  }

  const { success, result } = outcome.body;

  if (!success) {
    // Incorrect credentials.
    // TODO: Handle login failure.
    return;
  }

  const payload = {
    authenticated: true,
    authorization: result.authorization,
  };

  yield put(authenticateUserSuccess(payload));
  yield put(changeRoute('/'));
  return;
}

export const authenticationSagas = [
  takeLatest(AuthenticationActions.FETCH_AUTHENTICATION_PENDING, handleAuthenticateUser),
  takeLatest(AuthenticationActions.LOGIN_USER_PENDING, handleLoginUser),
];
