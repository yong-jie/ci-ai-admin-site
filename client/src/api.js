const makeRequest = (url, options) => {
  const { method, data } = options;
  const fetchParams = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin', // Used to save session cookie.
  };

  if (data) {
    fetchParams.body = JSON.stringify(data);
  }

  return fetch(url, fetchParams)
    .then(res => res.json())
    .then(body => ({ body }))
    .catch(err => err);
};

export const checkAuthenticationStatus = () => {
  const url = '/api/authentication/status';
  const options = {
    method: 'GET',
  };
  return makeRequest(url, options);
};

export const login = (username, password, expiry) => {
  const url = '/api/authentication/login';
  const data = { username, password, expiry };
  const options = {
    method: 'POST',
    data,
  };
  return makeRequest(url, options);
};

export const fetchTemperatures = () => {
  const url = '/api/temperature/users';
  const options = {
    method: 'GET',
  };
  return makeRequest(url, options);
}
