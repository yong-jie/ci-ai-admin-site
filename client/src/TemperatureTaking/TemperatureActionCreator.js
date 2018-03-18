import keyMirror from 'keymirror';
import { fetchTemperatures } from '../api';

export const TemperatureActions = keyMirror({
  FETCH_STUDENT_TEMPERATURE_PENDING: null,
  FETCH_STUDENT_TEMPERATURE_SUCCESS: null,
});

export const fetchStudentTemperatures = () => {
  return {
    type: TemperatureActions.FETCH_STUDENT_TEMPERATURE_PENDING,
  };
};

export const fetchStudentTemperaturesSuccess = (students) => {
  return {
    type: TemperatureActions.FETCH_STUDENT_TEMPERATURE_SUCCESS,
    payload: students,
  };
};
