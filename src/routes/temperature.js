import { Router } from 'express';
import { success, error } from './resultWrapper';
import { text } from '../constants';
import { fetchUserTemperatures } from '../controllers/student';

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

export default router;
