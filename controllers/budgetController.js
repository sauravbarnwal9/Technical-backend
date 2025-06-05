import Budget from '../models/budget.model.js';
import { sendError } from '../utils/response.js';

export default class BudgetController {
    static async setBudget(payload, user) {
        try {
            const { month, amount } = payload;  // hapi uses request.payload for body
            const userId = user._id;
            let budget = await Budget.findOne({ userId, month });

            if (budget) {
                budget.amount = amount;
                await budget.save();
            } else {
                budget = new Budget({ userId, month, amount });
                await budget.save();
            }


            return budget
        } catch (err) {
            console.error(err);
            return sendError(err);

        }
    }

    static async getBudget(user, res) {
        try {
            const userId = user._id;

            // Get the start and end of the current month
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

            const budget = await Budget.findOne({
                userId,
                createdAt: {
                    $gte: startOfMonth,
                    $lte: endOfMonth,
                },
            });

            return budget;
        } catch (err) {
            console.error(err);
            return sendError(err);
        }
    }

}
