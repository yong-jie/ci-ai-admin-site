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
    const dataWrapper = { data };
    fetchParams.body = JSON.stringify(dataWrapper);
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
