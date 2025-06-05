import { STATUS_MSG, COMMON_STATUS } from '../config/AppConstraints.js';
import Transaction from '../models/transaction.model.js';

export default class TransactionController {
    /**
     * Create a new transaction
     * @param {Object} payload - transaction details
     * @param {Object} userData - authenticated user data
     */
    static async createTransaction(payload, userData) {
        try {
            console.log("userData", userData)
            // attach userId from auth info
            const transactionData = {
                ...payload,
                userId: userData._id,
                status: COMMON_STATUS.ACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const newTransaction = await Transaction.create(transactionData);
            return newTransaction;
        } catch (err) {
            console.error('TransactionController createTransaction error:', err);
            return Promise.reject({
                message: STATUS_MSG.ERROR.DEFAULT,
                detail: err.message || err,
            });
        }
    }

    /**
     * Get all transactions for a user with optional filters
     * @param {String} userId - id of authenticated user
     * @param {Object} filters - optional filter query
     */
    static async getUserTransactions(userData, filters = {}) {
        try {
            const query = { userId: userData._id, status: COMMON_STATUS.ACTIVE, };
            console.log("userData", userData)
            // Optional filter by type and category if provided
            if (filters.type) query.type = filters.type;
            if (filters.category) query.category = filters.category;

            // date filtering example
            if (filters.startDate || filters.endDate) {
                query.createdAt = {};
                if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate);
                if (filters.endDate) query.createdAt.$lte = new Date(filters.endDate);
            }

            const transactions = await Transaction.find(query, {}, { sort: { createdAt: -1 } });
            return transactions;
        } catch (err) {
            console.error('TransactionController getUserTransactions error:', err);
            return Promise.reject({
                message: STATUS_MSG.ERROR.DEFAULT,
                detail: err.message || err,
            });
        }
    }

    /**
     * Get summary totals grouped by category
     * @param {String} userId - id of authenticated user
     */
    static async getTotalByCategory(userId) {
        try {
            const summary = await Transaction.getTotalByCategory(userId);
            return summary;
        } catch (err) {
            console.error('TransactionController getTotalByCategory error:', err);
            return Promise.reject({
                message: STATUS_MSG.ERROR.DEFAULT,
                detail: err.message || err,
            });
        }
    }

    /**
     * Delete (soft-delete) a transaction by id for a user
     * @param {String} transactionId
     * @param {Object} userData
     */
    static async deleteTransaction(transactionId, userData) {
        try {
            const filter = { _id: transactionId, userId: userData._id };
            const update = { status: COMMON_STATUS.DELETED, updatedAt: new Date() };

            const result = await Transaction.updateOne(filter, update);
            if (result.modifiedCount === 0) {
                return Promise.reject({ message: 'Transaction not found or not authorized' });
            }
            return { message: STATUS_MSG.SUCCESS.DELETED };
        } catch (err) {
            console.error('TransactionController deleteTransaction error:', err);
            return Promise.reject({
                message: STATUS_MSG.ERROR.DEFAULT,
                detail: err.message || err,
            });
        }
    }

    /**
 * Update a transaction by ID for a user
 * @param {String} transactionId
 * @param {Object} payload - updated fields
 * @param {Object} userData - authenticated user data
 */
    static async updateTransaction(transactionId, payload, userData) {
        try {
            const filter = {
                _id: transactionId,
                userId: userData._id,
                status: COMMON_STATUS.ACTIVE,
            };

            const update = {
                ...payload,
                updatedAt: new Date(),
            };

            const updated = await Transaction.findOneAndUpdate(filter, update, {
                new: true,
            });

            if (!updated) {
                return Promise.reject({ message: 'Transaction not found or not authorized' });
            }

            return updated;
        } catch (err) {
            console.error('TransactionController updateTransaction error:', err);
            return Promise.reject({
                message: STATUS_MSG.ERROR.DEFAULT,
                detail: err.message || err,
            });
        }
    }

}
