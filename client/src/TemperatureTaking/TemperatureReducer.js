import { TemperatureActions } from './TemperatureActionCreator';

const initialState = {
  studentTemperatures: [],
};

const handleFetchStudentTemperatureSuccess = (state, action) => {
  const newState = { ...state };
  newState.studentTemperatures = action.payload;
  return newState;
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
