import User from '../models/user';
import { compareHash, generateHash } from '../helpers/crypto';

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
          return reject(err);
        }
        if (user == null) {
          return resolve({ success: false });
        }
        const hashesMatch = await compareHash(password, user.hashedPassword);
        if (!hashesMatch) {
          return resolve({ success: false });
        }
        user.authorizedTokens = addAuthorizationToken(expiry, sessionID, user.authorizedTokens);
        await user.save();
        return resolve({ sucess: true, authorization: user.authorization });
      });
});

/**
 * Creates a user with the given username, gender and authorization. Optionally sets
 * the password if the schema allows for one.
 * @param username
 * @param gender
 * @param authorization
 * @param password - (optional)
 * @return Promise<User>
 */
export const createUser = (username, gender, authorization, password) => {
  return new Promise(async (resolve, reject) => {
    const newUser = new User();
    newUser.username = username;
    newUser.gender = gender;
    newUser.authorization = authorization;
    if (password) {
      newUser.hashedPassword = await generateHash(password);
    }
    newUser.save((err, user) => {
      if (err) {
        return reject(err);
      }
      return resolve(user);
    });
  });
};
