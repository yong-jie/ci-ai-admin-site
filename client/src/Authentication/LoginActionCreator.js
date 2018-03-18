import keyMirror from 'keymirror';

export const LoginActions = keyMirror({
  LOGIN_USER_PENDING: null,
  LOGIN_USER_FAILURE: null,
  LOGIN_USER_INCORRECT_CREDENTIALS: null,
});

export const loginUser = (username, password, expiry) => {
  const data = { username, password, expiry };
  return {
    type: LoginActions.LOGIN_USER_PENDING,
    payload: data,
  };
};

export const loginIncorrectCredentials = () => {
  return {
    type: LoginActions.LOGIN_USER_INCORRECT_CREDENTIALS,
  };
};
