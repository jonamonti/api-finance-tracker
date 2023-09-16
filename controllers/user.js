import mongoose from 'mongoose';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

// GET
// get user info from db and send it to fe
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};

// PUT
export const updateUser = async (req, res) => {

}