import { LoginActions } from './LoginActionCreator';

const initialState = {
  incorrectCredentials: false, // Indicates a failed login attempt.
  error: false, // Indicates that something went wrong.
};

const handleLoginFailure = (state, action) => {
  const newState = {...initialState};
  newState.error = true;
  return newState;
};

const handleLoginIncorrectCredentials = (state, action) => {
  const newState = {...initialState};
  newState.incorrectCredentials = true;
  return newState;
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case LoginActions.LOGIN_USER_FAILURE:
    return handleLoginFailure(state, action);
  case LoginActions.LOGIN_USER_INCORRECT_CREDENTIALS:
    return handleLoginIncorrectCredentials(state, action);
  default:
    return state;
  }
};

export default loginReducer;
