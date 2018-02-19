import { Router } from 'express';

const router = Router();

router.get('/create', (req, res, next) => {
  res.status(200).json({ success: true });
});

export default router;
