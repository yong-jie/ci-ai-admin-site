import { TemperatureActions } from './TemperatureActionCreator';

const initialState = [];

const handleFetchStudentTemperatureSuccess = (state, action) => {
  return action.payload;
}

const handleUpdateStudentTemperatureSuccess = (state, action) => {
  const index = state.findIndex((student) => (
    student.nric === action.payload.username
  ));
  const numericalValue = parseInt(action.payload.value, 10);
  return [
      ...state.slice(0, index),
    Object.assign({}, state[index], {
      temperature: numericalValue,
      lastUpdated: Date.now(),
    }),
      ...state.slice(index + 1)
  ];
};

const temperatureReducer = (state = initialState, action) => {
  switch (action.type) {
  case TemperatureActions.FETCH_STUDENT_TEMPERATURE_SUCCESS:
    return handleFetchStudentTemperatureSuccess(state, action);
  case TemperatureActions.UPDATE_STUDENT_TEMPERATURE_SUCCESS:
    return handleUpdateStudentTemperatureSuccess(state, action);
  default:
    return state;
  }
};

export default temperatureReducer;
