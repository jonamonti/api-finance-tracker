import mongoose from "mongoose";
import { trxCategories, trxTypes } from "../utils/const.js";

const TransactionSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: trxTypes,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    set: (v) => v.toFixed(2) // to store amount rounded to 2 decimals
  },
  description: {
    type: String,
    default: '',
    max: 30
  },
  category: {
    type: String,
    enum: trxCategories,
    required: true
  }
},
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;