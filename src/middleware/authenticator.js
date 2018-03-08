import User from '../models/user';
import { validateAuthorizationToken } from '../controllers/user';

/**
 * Middleware to check if a user is authenticated, and updates respective fields in
 * the request parameter. At present, users with authorization of 'Student' are assumed
 * to be unauthenticated because students dont have accounts.
 * @param req - The request object to have params modified
 * @param res - The response object. Irrelevant in this method
 * @param next - Next function to run after this middleware is done
 */
const authenticator = (req, res, next) => {
  req.authenticated = false;
  const hasAuthenticationField = req.session.auth && req.session.auth.username;
  if (!hasAuthenticationField) {
    return next();
  }
  return User.findOne({ username: req.session.auth.username }).select('authorizedTokens authorization').exec((err, user) => {
    if (user != null) {
      req.authenticated = validateAuthorizationToken(req.session.id, user.authorizedTokens);
      if (req.authenticated) {
        req.authorization = user.authorization;
      }
    }
    return next();
  });
};

export default authenticator;
