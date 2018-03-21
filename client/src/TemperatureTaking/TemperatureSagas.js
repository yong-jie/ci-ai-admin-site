import { call, put, takeLatest } from 'redux-saga/effects';

import { TemperatureActions, fetchStudentTemperaturesSuccess, updateStudentTemperatureSuccess } from './TemperatureActionCreator';
import { fetchTemperatures, updateTemperature } from '../api';

export function* handleFetchTemperatures() {
  let outcome;
  try {
    outcome = yield call(fetchTemperatures);
  } catch (err) {
    // Connection-related error.
    // TODO: Handle error.
    return;
  }

  const { success, result } = outcome.body;
  if (!success) {
    // Unauthorized request.
    // Might need to redirect to login page because there
    // is an edge case where user idles past expiry time and
    // attempts to access temperatures.
    // TODO: Redirect to login page.
    return;
  }

  yield put(fetchStudentTemperaturesSuccess(result.students));
  return;
}

export function* handleUpdateTemperature(action) {
  const { username, value } = action.payload;

  let outcome;
  try {
    outcome = yield call(updateTemperature, username, value);
  } catch (err) {
    // TODO: Handle connection error.
    return;
  }

  const { success } = outcome.body;

  if (!success) {
    // Unauthenticated.
    // TODO: Handle unauthenticated.
    return;
  }

  yield put(updateStudentTemperatureSuccess(username, value));
  return;
}

export const temperatureTakingSagas = [
  takeLatest(TemperatureActions.FETCH_STUDENT_TEMPERATURE_PENDING, handleFetchTemperatures),
  takeLatest(TemperatureActions.UPDATE_STUDENT_TEMPERATURE_PENDING, handleUpdateTemperature),
];
