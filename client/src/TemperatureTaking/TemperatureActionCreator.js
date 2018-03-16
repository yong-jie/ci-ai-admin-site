import keyMirror from 'keymirror';
import { fetchTemperatures } from '../api';

export const TemperatureActions = keyMirror({
  FETCH_STUDENT_TEMPERATURE: null,
});

export const fetchStudentTemperatures = async () => {
  const response = await fetchTemperatures();
  // TODO: Handle error.
  return {
    type: TemperatureActions.FETCH_STUDENT_TEMPERATURE,
    payload: response.body.result,
  };
};
