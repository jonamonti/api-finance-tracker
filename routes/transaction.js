import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getTrxs } from '../controllers/transaction.js';

const router = express.Router();

// GET
// get user transactions
router.get('/:id', verifyToken, getTrxs); // Trxs as transactions

export default router;