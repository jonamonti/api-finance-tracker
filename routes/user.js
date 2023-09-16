import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getUser, updateUser } from '../controllers/user.js'

const router = express.Router();

// GET
router.get('/:id', verifyToken, getUser);

// UPDATE
router.put('/', verifyToken, updateUser);

export default router;