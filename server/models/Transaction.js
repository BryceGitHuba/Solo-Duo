// server/models/Transaction.js
const mongoose = require('mongoose');

// Schema definition for transactions
const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Add indexes to optimize queries
transactionSchema.index({ user: 1, date: -1 });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;