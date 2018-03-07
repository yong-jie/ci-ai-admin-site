import { Router } from 'express';
import { success, error } from './resultWrapper';

const router = Router();

router.get('/users', (req, res, next) => {
  return res.status(200).json(success([
    {
      id: 1,
      name: 'Test',
      nric: 'S0000000A',
      mostRecent: 0,
    },
    {
      id: 2,
      name: 'Hello',
      nric: 'S0001110B',
      mostRecent: 2,
    },
  ]));
});

export default router;
