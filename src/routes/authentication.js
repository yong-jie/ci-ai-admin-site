import { Router } from 'express';
import { success, error } from './resultWrapper';
import { text } from '../constants';
import {createUser, loginUser} from '../controllers/user';
import { config } from '../config';

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
  return res.status(200).json(success({ authorization: result.authorization }));
});

router.post('/create', async (req, res) => {
  if (!req.body) {
    return res.status(400).json(error(text.useJson));
  }

  const {
    username,
    password,
    authorization,
    gender,
  } = req.body;

  // Helper variables
  const needsPassword = config.USER_AUTHORIZATIONS_THAT_CAN_LOGIN
    .includes(authorization);

  // Validation
  const hasUsername = username;
  const validGender = ['Male', 'Female'].includes(gender);
  const validAuthorization = config.ALL_POSSIBLE_USER_AUTHORIZATIONS
    .includes(authorization);
  const hasPasswordIfNeeded = (needsPassword && password)
    || !needsPassword;
  if (!(validGender && validAuthorization && hasPasswordIfNeeded && hasUsername)) {
    return res.status(400).json(error(text.missingOrInvalidParams));
  }

  let user;
  try {
    user = await createUser(username, gender, authorization, password);
  } catch (e) {
    return res.status(500).json(error(text.unknownError));
  }
  return res.status(200).json(success({}));
});

export default router;
