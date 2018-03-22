import { Router } from 'express';
import { success, error } from './resultWrapper';
import { text } from '../constants';
import { fetchUserTemperatures, addTemperature } from '../controllers/student';

// Only these users can interact with these APIs.
const requiredAuthorization = ['Teacher', 'Admin'];

const router = Router();

router.get('/users', async (req, res, next) => {
  const isAuthorized = req.authenticated
        && requiredAuthorization.includes(req.authorization);
  if (!isAuthorized) {
    return res.status(403).json(error(text.unauthorized));
  }

  let students;
  try {
    students = await fetchUserTemperatures();
  } catch (err) {
    res.status(500).json(error(text.unknownError));
  }
  return res.status(200).json(success({
    students,
  }));
});

router.post('/update', async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json(error(text.useJson));
  }

  const isAuthorized = req.authenticated
        && requiredAuthorization.includes(req.authorization);
  if (!isAuthorized) {
    return res.status(403).json(error(text.unauthorized));
  }

  const {
    username,
    value,
  } = req.body;

  // Validate Temperature is either whole number or at most 1 decimal place
  const isValidTemperature = value % 1 === 0 || (value * 10) % 1 === 0;
  if (!isValidTemperature) {
    return res.status(403).json(error(text.missingOrInvalidParams));
  }

  let student;
  try {
    student = await addTemperature(username, value);
  } catch (err) {
    return res.status(400).json(error(text.missingOrInvalidParams));
  }
  return res.status(200).json(success({}));
});

export default router;
