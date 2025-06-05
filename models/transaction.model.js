import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    description: { type: String, default: '' },
    status: { type: String, default: '' },
    date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('transaction', TransactionSchema);
