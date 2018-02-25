const authenticator = (req, res, next) => {
  if (req.session.auth && req.session.username) {
    // TODO: Finish the authentication part.
    req.authenticated = true;
  } else {
    req.authenticated = false;
  }
  return next();
};

export default authenticator;
