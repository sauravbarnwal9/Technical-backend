import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
}, { timestamps: true });

export default mongoose.model('category', CategorySchema);
