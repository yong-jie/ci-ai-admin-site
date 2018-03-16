import keyMirror from 'keymirror';

export const AuthenticationActions = keyMirror({
  FETCH_AUTHENTICATION_PENDING: null,
  FETCH_AUTHENTICATION_SUCCESS: null,
  FETCH_AUTHENTICATION_FAILURE: null,
});

export const authenticateUser = () => {
  return {
    type: AuthenticationActions.FETCH_AUTHENTICATION_PENDING,
  };
};

export const authenticateUserSuccess = (result) => {
  return {
    type: AuthenticationActions.FETCH_AUTHENTICATION_SUCCESS,
    payload: result,
  };
};

export const authenticateUserFailure = () => {
  return {
    type: AuthenticationActions.FETCH_AUTHENTICATION_FAILURE,
  };
}
