import { AuthenticationActions } from './AuthenticationActionCreator';

const initialState = {
  authorization: 'Guest',
  authenticated: false,
};

const handleFetchAuthenticationStatusSuccess = (state, action) => {
  // Payload contains { authenticated, authorization }.
  const { payload } = action;
  const newState = { ...state };
  console.log(payload);
  newState.authenticated = payload.authenticated;
  newState.authorization = payload.authorization;
};

const handleFetchAuthenticationStatusFailure = (state, action) => initialState;

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
  case AuthenticationActions.FETCH_AUTHENTICATION_SUCCESS:
    return handleFetchAuthenticationStatusSuccess(state, action);
  case AuthenticationActions.FETCH_AUTHENTICATION_FAILURE:
    return handleFetchAuthenticationStatusFailure(state, action);
  default:
    return state;
  }
};

export default authenticationReducer;
