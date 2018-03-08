import { Router } from 'express';
import { success, error } from './resultWrapper';
import { text } from '../constants';
import { fetchUserTemperatures } from '../controllers/student';

const router = Router();

router.get('/users', async (req, res, next) => {
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
