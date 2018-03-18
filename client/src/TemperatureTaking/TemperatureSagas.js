import { call, put, takeLatest } from 'redux-saga/effects';

import { TemperatureActions, fetchStudentTemperaturesSuccess } from './TemperatureActionCreator';
import { fetchTemperatures } from '../api';

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

export const temperatureTakingSagas = [
  takeLatest(TemperatureActions.FETCH_STUDENT_TEMPERATURE_PENDING, handleFetchTemperatures),
];
