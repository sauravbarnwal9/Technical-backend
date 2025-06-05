import Budget from "../models/budget.model.js";
import Transaction from "../models/transaction.model.js";

const SummaryController = {
    getMonthlySummary: async (userId, month) => {
        try {
            const startDate = new Date(`${month}-01`);
            const endDate = new Date(startDate);
            endDate.setMonth(startDate.getMonth() + 1);

            const transactions = await Transaction.find({
                userId,
                date: { $gte: startDate, $lt: endDate },
            });

            let income = 0;
            let expenses = 0;

            transactions.forEach((tx) => {
                if (tx.type === 'income') income += tx.amount;
                else if (tx.type === 'expense') expenses += tx.amount;
            });

            const budgetDoc = await Budget.findOne({ userId, month });
            const budgetAmount = budgetDoc?.amount || 0;

            return {
                income,
                expenses,
                budget: budgetAmount,
                balance: budgetAmount + income - expenses,
            };
        } catch (error) {
            throw new Error('Failed to get monthly summary: ' + error.message);
        }
    },
};

export default SummaryController;
