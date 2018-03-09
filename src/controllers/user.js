import User from '../models/user';
import Student from '../models/student';
import { compareHash, generateHash } from '../helpers/crypto';

const addAuthorizationToken = (expiry, sessionID, tokens) => {
  const expiryDate = new Date();
  expiryDate.setSeconds(expiryDate.getSeconds() + parseInt(expiry, 10));

  const validTokens = tokens.filter(token =>
    token.expiry.getTime() > Date.now() && token.id !== sessionID);
  validTokens.push({ id: sessionID, expiry: expiryDate });

  return validTokens;
};

const removeAuthorizationToken = (sessionID, tokens) => {
  const validTokens = tokens.filter(token =>
    token.expiry.getTime() > Date.now() && token.id !== sessionID);
}

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
 * Checks if the username has already been taken.
 * @param username - Plaintext username. Will automatically convert
 * it to uppercase
 * @returns {Promise<Boolean>} - Whether username is taken
 */
export const usernameTaken = (username) => {
  const userExists = new Promise((resolve, reject) => {
    User.findOne({ username: username.toUpperCase() })
      .select('username').exec((err, user) => {
        if (err) return reject(err);
        if (user == null) return resolve(false);
        return resolve(true);
      });
  });
  const studentExists = new Promise((resolve, reject) => {
    Student.findOne({ username: username.toUpperCase() })
      .select('username').exec((err, student) => {
        if (err) return reject(err);
        if (student == null) return resolve(false);
        return resolve(true);
      });
  });
  return Promise.all([userExists, studentExists])
    .then(results => (results[0] || results[1]))
    .catch(err => err);
};

/**
 * Maps a list of NRIC numbers to list of ObjectId's pointing to User's.
 * @param parents - A list of NRIC numbers
 * @returns {Promise<ObjectId>} - A list of ObjectId's that point to
 * Users with authorization 'Parent'
 * @throws null - Will reject if they are not parent objects.
 */
export const mapNricToParent = (parents) => {
  const promises = parents.map(parent => (
    new Promise((resolve, reject) => {
      User.findOne({
        username: parent.toUpperCase(),
        authorization: 'Parent',
      })
        .select('_id').exec((err, user) => {
          if (err) return reject(err);
          if (user == null) return reject();
          return resolve(user._id);
        });
    })
  ));
  return Promise.all(promises);
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
      username: username.toUpperCase(),
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
        user.authorizedTokens =
          addAuthorizationToken(expiry, sessionID, user.authorizedTokens);
        await user.save();
        return resolve({ success: true, authorization: user.authorization });
      });
  });

/**
 * Logs the user out. Will resolve even if user does not exist.
 * @param username
 * @param sessionID
 * @return Promise<>
 */
export const logoutUser = (username, sessionID) => (
  new Promise((resolve, reject) => {
    User.findOne({ username: username.toUpperCase() })
      .select('authorizedTokens')
      .exec(async (err, user) => {
        if (err) return reject(err);
        if (user) {
          user.authorizedTokens =
            removeAuthorizationToken(sessionID, user.authorizedTokens);
          await user.save();
        }
        return resolve();
      });
  })
);

/**
 * Creates a user with the given username, gender and authorization. Optionally sets
 * the password if the schema allows for one.
 * @param username
 * @param gender
 * @param authorization
 * @param password - (optional)
 * @return Promise<User>
 */
export const createUser = (username, gender, authorization, password) =>
  new Promise(async (resolve, reject) => {
    const newUser = new User();
    newUser.username = username.toUpperCase();
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
