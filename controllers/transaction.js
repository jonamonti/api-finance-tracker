import mongoose from 'mongoose';
import Transaction from '../models/Transaction.js';
import totalValues from '../utils/functions.js';
import { createObjectCsvWriter } from 'csv-writer';
import { CSV_SAVE_PATH } from '../utils/const.js';

export const createTrx = async (req, res) => {
  try {
    const { userID, amount, type, category, description, date } = req.body;
    const amountNumber = Number(amount);
    const newTrx = new Transaction({ userID, amount: amountNumber, type, category, description, date });
    await newTrx.save();
    // res.status(201).json(newTrx); // use this to send back this new trx
    const userTrxs = await Transaction.find({ userID: userID }).sort({ date: 'desc' });
    const total = totalValues(userTrxs);
    res.status(201).json({ userTrxs, total }); // use this to send back all trxs of this user
  }
  catch (err) {
    console.log(err.message);
    res.status(409).json({ message: err.message })
  }
};

export const getTrxs = async (req, res) => {
  try {
    const { id } = req.params;
    const userTrxs = await Transaction.find({ userID: id }).sort({ date: 'desc' });
    const total = totalValues(userTrxs);
    console.log(total);
    res.status(201).json({ userTrxs, total }); // use this to send back all trxs of this user

  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};

export const getTrxsCsv = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Transaction.find({ userID: id })
      .select('_id type amount desctiption category date')
      .sort({ date: 'desc' });

    // extract variable names to build csv headers
    const object = response[0]._doc;
    const keys = Object.keys(object);
    const header = [];
    for (let i = 0; i < keys.length; i++) {
      header.push({ id: keys[i], title: `${keys[i] === '_id' ? 'transactionId' : keys[i]}` })
    }
    const csvWriter = createObjectCsvWriter({
      path: CSV_SAVE_PATH,
      header
    })

    // store .csv in server
    await csvWriter.writeRecords(response)
      .then(() => {
        console.log('...Done')
      })

    res.download(CSV_SAVE_PATH, 'transactions.csv', (error) => {
      if (error) {
        res.status(404).json({ message: 'File not found' })
      } else {
        res.status(200).json({ message: true });
      }
    })


  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const updateTrx = async (req, res) => {
  try {
    const { _id, userID, amount, type, category, description, date } = req.body;
    const updatedTrx = await Transaction.findByIdAndUpdate(_id, { amount, type, category, description, date }, { new: true });
    const userTrxs = await Transaction.find({ userID: userID }).sort({ date: 'desc' });
    const total = totalValues(userTrxs);
    console.log(total);
    res.status(201).json({ userTrxs, total }); // use this to send back all trxs of this user
  }
  catch (err) {
    res.status(409).json({ message: err.message })
  }
};


export const deleteTrx = async (req, res) => {
  try {
    const { _id, userID } = req.body;
    const deletedTrx = await Transaction.findByIdAndRemove(_id);
    if (!deletedTrx) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const userTrxs = await Transaction.find({ userID: userID }).sort({ date: 'desc' });
    const total = totalValues(userTrxs);
    res.status(201).json({ userTrxs, total }); // use this to send back all trxs of this user
  }
  catch (err) {
    res.status(409).json({ message: err.message })
  }
};

