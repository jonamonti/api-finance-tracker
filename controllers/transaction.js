import mongoose from 'mongoose';
import Transaction from '../models/Transaction.js';

export const getTrxs = async (req, res) => {
  try {
    const { id } = req.params;
    const userTrxs = await Transaction.find({ userID: id });
    res.send(200).json(userTrxs);
    
  } catch (error) {
    res.status(404).json({ message: err.message })
  }
};