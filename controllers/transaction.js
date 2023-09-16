import mongoose from 'mongoose';
import Transaction from '../models/Transaction.js';

export const createTrx = async (req, res) => {
  try {
    const { userID, amount, type, category, description } = req.body;
    const newTrx = new Transaction({ userID, amount, type, category, description });
    await newTrx.save();
    // res.status(201).json(newTrx); // use this to send back this new trx
    const userTrxs = await Transaction.find({ userID: userID });
    res.status(201).json(userTrxs); // use this to send back all trxs of this user
  } 
   catch (err) {
    res.status(409).json({ message: err.message})
  }
};

export const getTrxs = async (req, res) => {
  try {
    const { id } = req.params;
    const userTrxs = await Transaction.find({ userID: id });
    res.status(200).json(userTrxs);
    
  } catch (error) {
    res.status(404).json({ message: err.message })
  }
};

export const updateTrx = async (req, res) => {
  try {
    const { _id, userID, amount, type, category, description } = req.body;
    const updatedTrx = await Transaction.findByIdAndUpdate(_id, { amount, type, category, description }, { new: true });
    const userTrxs = await Transaction.find({ userID: userID });
    // res.status(202).json(updatedTrx); // use this to send back this updated trx
    res.status(202).json(userTrxs);
  }
   catch (error) {
    res.status(409).json({ message: err.message})
  }
};


export const deleteTrx = async (req, res) => {
  try {
    const { _id, userID } = req.body;
    const deletedTrx = await Transaction.findByIdAndRemove(_id);
    if (!deletedTrx) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const userTrxs = await Transaction.find({ userID: userID });
    res.status(202).json(userTrxs);
  }
   catch (err) {
    res.status(409).json({ message: err.message})
  }
};
  
