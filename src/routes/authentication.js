import { Router } from 'express';
import { success, error } from './resultWrapper';
import { text } from '../constants';
import { createUser, loginUser, logoutUser, usernameTaken, mapNricToParent } from '../controllers/user';
import { createStudent } from '../controllers/student';

const router = Router();

router.get('/status', (req, res, next) => {
  if (!req.authenticated) {
    return res.status(200).json(
      success({
        authenticated: false,
      })
    );
  }
  return res.status(200).json(success({
    authenticated: true,
    authorization: req.authorization,
  }));
});

router.post('/login', async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json(error(text.useJson));
  }

  // Validation
  const { username, password, expiry } = req.body;
  const validExpiry = (Number.isInteger(expiry)
    || Number.isInteger(parseInt(expiry, 10)))
    && expiry > 0;
  if (!username || !password || !validExpiry) {
    return res.status(400).json(error(text.missingOrInvalidParams));
  }

  const result = await loginUser(username, password, expiry, req.session.id);
  if (result.success === false) {
    return res.status(400).json(error(text.incorrectUsernameOrPassword));
  }
  req.session.auth = { username: username.toUpperCase() };
  return res.status(200).json(success({ authorization: result.authorization }));
});

router.post('/logout', async (req, res, next) => {
  // Make sure user is authenticated.
  if (!req.authenticated) {
    return res.status(401).json(error(text.unauthorized));
  }

  await logoutUser(req.session.auth.username, req.session.id);
  req.session.auth = null;
  return res.status(200).json(success({}));
});

/**
 * Creates a user with given username, password, authorization
 * and gender.
 * Can only be done by an admin.
 */
router.post('/create/user', async (req, res) => {
  if (!req.body) {
    return res.status(400).json(error(text.useJson));
  }

  const isAuthorized = req.authenticated && req.authorization === 'Admin';
  if (!isAuthorized) {
    return res.status(403).json(error(text.unauthorized));
  }

  const {
    username,
    password,
    authorization,
    gender,
  } = req.body;

  // Validation
  const hasUsername = username;
  const validGender = ['Male', 'Female'].includes(gender);
  const validAuthorization = ['Parent', 'Teacher', 'Admin']
    .includes(authorization);
  if (!(validGender && validAuthorization && hasUsername)) {
    return res.status(400).json(error(text.missingOrInvalidParams));
  }

  // Assert that username not taken yet.
  const usernameIsTaken = await usernameTaken(username);
  if (usernameIsTaken) {
    return res.status(400).json(error(text.missingOrInvalidParams));
  }

  let user;
  try {
    user = await createUser(username, gender, authorization, password);
  } catch (err) {
    return res.status(500).json(error(text.unknownError));
  }
  return res.status(200).json(success({}));
});

/**
 * Creates a student with given username. At present, can only be
 * done by an admin.
 */
router.post('/create/student', async (req, res) => {
  if (!req.body) {
    return res.status(400).json(error(text.useJson));
  }

  const isAuthorized = req.authenticated && req.authorization === 'Admin';
  if (!isAuthorized) {
    return res.status(403).json(error(text.unauthorized));
  }

  const {
    username,
    name,
    gender,
    parents,
  } = req.body;

  // Validation
  const hasUsername = username;
  const hasName = name;
  const validGender = ['Male', 'Female'].includes(gender);
  if (!(hasUsername && hasName && validGender)) {
    return res.status(400).json(error(text.missingOrInvalidParams));
  }

  // Assert that username is not taken yet.
  const usernameIsTaken = await usernameTaken(username);
  if (usernameIsTaken) {
    return res.status(400).json(error(text.missingOrInvalidParams));
  }

  let mappedParents = parents || [];
  if (mappedParents.length > 0) {
    // Assert that parents parameter contains list of valid NRICs.
    // TODO: This assertion does not check for duplicates in list!
    const validNricPromises = mappedParents.map(parent => (
      usernameTaken(parent)
    ));
    const arrayOfInvalidNrics = await Promise.all(validNricPromises)
      .then(results => (
        results.filter(result => !result)
      ));
    if (arrayOfInvalidNrics.length > 0) {
      return res.status(400).json(error(text.missingOrInvalidParams));
    }

    try {
      // All NRICs are valid at this point, but this method will
      // throw if the NRICs are not linked to 'Parent' users.
      mappedParents = await mapNricToParent(mappedParents);
    } catch (err) {
      return res.status(400).json(error(text.missingOrInvalidParams));
    }
  }

  let student;
  try {
    student = await createStudent(username, gender, name, mappedParents);
  } catch (err) {
    return res.status(500).json(error(text.unknownError));
  }
  return res.status(200).json(success({}));
});

export default router;
