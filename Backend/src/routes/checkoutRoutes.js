import express from 'express';
import { getCheckouts, addCheckout } from '../controllers/checkoutController.js';

const router = express.Router();

router.get('/', getCheckouts);
router.post('/', addCheckout);

export default router;

