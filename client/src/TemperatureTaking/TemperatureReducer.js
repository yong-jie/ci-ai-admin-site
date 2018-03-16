import { TemperatureActions } from './TemperatureActionCreator';

const initialState = {
  students: [],
};

const handleFetchStudentTemperatureCompleted = (state, action) => {
  const {
    error,
    payload,
  } = action;
  const newState = { ...state };
  if (error) {
    // TODO: Handle fetch student failure.
  }
  newState.students = payload;
  return newState;
}

const temperatureReducer = (state = initialState, action) => {
  switch (action.type) {
    case TemperatureActions.FETCH_STUDENT_TEMPERATURE:
      return handleFetchStudentTemperatureCompleted(state, action);
    default:
      return state;
  }
};

export default temperatureReducer;
