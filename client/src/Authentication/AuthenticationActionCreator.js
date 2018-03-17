import keyMirror from 'keymirror';

export const AuthenticationActions = keyMirror({
  FETCH_AUTHENTICATION_PENDING: null,
  FETCH_AUTHENTICATION_SUCCESS: null,
  FETCH_AUTHENTICATION_FAILURE: null,
  LOGIN_USER_PENDING: null,
  LOGIN_USER_SUCCESS: null,
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
};

export const loginUser = (username, password, expiry) => {
  const data = { username, password, expiry };
  return {
    type: AuthenticationActions.LOGIN_USER_PENDING,
    payload: data,
  };
};
