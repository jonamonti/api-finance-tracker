import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getTrxs, updateTrx, createTrx, deleteTrx } from '../controllers/transaction.js';

const router = express.Router();

// GET
// get user transactions
router.get('/:id', verifyToken, getTrxs); // Trxs as transactions

// POST
// add new transaction
router.post('/', verifyToken, createTrx);

// UPDATE
// edit transaction info
router.put('/', verifyToken, updateTrx);

// DELETE
router.delete('/', verifyToken, deleteTrx)


export default router;