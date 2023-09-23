import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getTrxs, updateTrx, createTrx, deleteTrx, getTrxsCsv } from '../controllers/transaction.js';

const router = express.Router();

// GET
// get user transactions
router.get('/:id', verifyToken, getTrxs); // Trxs as transactions
router.get('/:id/download', verifyToken, getTrxsCsv); // Trxs as transactions

// POST
// add new transaction
router.post('/', verifyToken, createTrx);

// UPDATE
// edit transaction info
router.put('/', verifyToken, updateTrx);

// DELETE
router.post('/delete', verifyToken, deleteTrx)


export default router;