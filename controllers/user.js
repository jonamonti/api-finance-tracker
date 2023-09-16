import mongoose from 'mongoose';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

// GET
// get user info from db and send it to fe
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({_id: id});
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
};

// PUT
export const updateUser = async (req, res) => {
  try {
    const { _id, firstName, lastName, email, password, picturePath } = req.body;
    const updatedUser = await User.findByIdAndUpdate(_id, { firstName, lastName, email, password, picturePath }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  }
   catch (error) {
    res.status(404).json({ message: error.message })
  }
}