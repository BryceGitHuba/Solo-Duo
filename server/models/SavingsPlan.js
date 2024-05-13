// server/models/SavingsPlan.js
const mongoose = require('mongoose');

const savingsPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    monthlyIncome: {
        type: Number,
        required: true
    },
    savingsAmount: {
        type: Number,
        required: true
    },
    savingsGoal: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SavingsPlan = mongoose.model('SavingsPlan', savingsPlanSchema);

module.exports = SavingsPlan;