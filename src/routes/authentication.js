import { Router } from 'express';
import { success, error } from './resultWrapper';

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

router.post('/login', (req, res, next) => {

});

export default router;
