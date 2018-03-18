import { TemperatureActions } from './TemperatureActionCreator';

const initialState = [];

const handleFetchStudentTemperatureSuccess = (state, action) => {
  return action.payload;
}

const temperatureReducer = (state = initialState, action) => {
  switch (action.type) {
  case TemperatureActions.FETCH_STUDENT_TEMPERATURE_SUCCESS:
    return handleFetchStudentTemperatureSuccess(state, action);
    default:
      return state;
  }
};

export default temperatureReducer;
