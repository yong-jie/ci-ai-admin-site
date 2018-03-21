import keyMirror from 'keymirror';

export const TemperatureActions = keyMirror({
  FETCH_STUDENT_TEMPERATURE_PENDING: null,
  FETCH_STUDENT_TEMPERATURE_SUCCESS: null,
  UPDATE_STUDENT_TEMPERATURE_PENDING: null,
  UPDATE_STUDENT_TEMPERATURE_SUCCESS: null,
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

export const updateStudentTemperature = (username, value) => {
  const data = { username, value };
  return {
    type: TemperatureActions.UPDATE_STUDENT_TEMPERATURE_PENDING,
    payload: data,
  };
}

export const updateStudentTemperatureSuccess = (username, value) => {
  const data = { username, value };
  return {
    type: TemperatureActions.UPDATE_STUDENT_TEMPERATURE_SUCCESS,
    payload: data,
  };
};
