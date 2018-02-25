import User from '../models/user';
import { compareHash } from '../helpers/crypto';

const addAuthorizationToken = (expiry, sessionID, tokens) => {
  const expiryDate = new Date();
  expiryDate.setSeconds(expiryDate.getSeconds() + parseInt(expiry, 10));

  const validTokens = tokens.filter(token =>
    token.expiry.getTime() > Date.now() && token.id !== sessionID);
  validTokens.push({ id: sessionID, expiry: expiryDate });

  return validTokens;
};

/**
 * Validates the session ID against a list of valid tokens.
 * Does not delete obsolete tokens.
 * @param sessionID - The session's ID which is used as the authentication token
 * @param tokens - The list of accepted tokens. Obtain from a user's model
 * @returns {boolean} - Whether the session ID is authenticated
 */
export const validateAuthorizationToken = (sessionID, tokens) => {
  const matchingTokens = tokens.filter(token =>
    token.expiry.getTime() > Date.now() && token.id === sessionID);
  return matchingTokens.length > 0;
};

/**
 * Validates credentials, creates the authorization token, and
 * stores required params in session cookie for future authentication
 * made by the authenticator middleware.
 * @param username - Username
 * @param password - Password
 * @param expiry - Integer specifying number of seconds the token is
 * valid for.
 * @param sessionID - The session ID (for generating the auth token)
 * @return Promise<Object> - An object containing a success boolean param
 */
export const loginUser = (username, password, expiry, sessionID) =>
  new Promise((resolve, reject) => {
    User.findOne({
      username,
      authorization: {
        $in: ['Admin', 'Teacher'],
      },
    }).select('hashedPassword authorizedTokens authorization')
      .exec(async (err, user) => {
        if (err) {
          reject(err);
        }
        if (user == null) {
          resolve({ success: false });
        }
        const hashesMatch = await compareHash(password, user.hashedPassword);
        if (!hashesMatch) {
          resolve({ success: false });
        }
        user.authorizedTokens = addAuthorizationToken(expiry, sessionID, user.authorizedTokens);
        await user.save();
        resolve({ sucess: true, authorization: user.authorization });
      });
});
