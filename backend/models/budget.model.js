import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: String, required: true }, // 1-12
    amount: { type: Number, required: true }, // budgeted amount
}, { timestamps: true });

BudgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true }); // Unique budget per user per month-year

export default mongoose.model('Budget', BudgetSchema);
