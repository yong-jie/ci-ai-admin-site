import { Router } from 'express';
import { success, error } from './resultWrapper';
import { text } from '../constants';
import { loginUser } from '../controllers/user';

const router = Router();

router.get('/status', (req, res, next) => {
  if (!req.authenticated) {
    return res.status(200).json(
      success({
        authenticated: false,
      })
    );
  }
  return res.status(200).json(success({ authenticated: true, authorization: req.authorization }));
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

export default router;
