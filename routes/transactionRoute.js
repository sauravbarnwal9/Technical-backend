import Joi from 'joi';
import TransactionController from '../controllers/transactionController.js';
import { failActionFunction, sendError, sendSuccess } from '../utils/response.js';
import { STATUS_MSG, LANGUAGE } from '../config/AppConstraints.js';
import { STRATEGY } from '../config/AppConstraints.js';

const transactionRoutes = [
    {
        method: 'POST',
        path: '/transactions',
        options: {
            handler: async (request, h) => {
                try {
                    const data = await TransactionController.createTransaction(request.payload, request.auth.credentials);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'Add a new transaction',
            notes: 'Adds an income or expense transaction for authenticated user',
            tags: ['api', 'transactions'],
            auth: STRATEGY.USER,
            validate: {
                payload: Joi.object({
                    amount: Joi.number().positive().required(),
                    type: Joi.string().valid('income', 'expense').required(),
                    category: Joi.string().required(), // category id or name
                    date: Joi.date().required(),
                    description: Joi.string().optional().allow(''),
                }),
                failAction: failActionFunction,
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: STATUS_MSG,
                },
            },
        },
    },
    {
        method: 'GET',
        path: '/transactions',
        options: {
            handler: async (request, h) => {
                try {
                    const filters = {
                        category: request.query.category,
                        startDate: request.query.startDate,
                        endDate: request.query.endDate,
                        minAmount: request.query.minAmount,
                        maxAmount: request.query.maxAmount,
                        page: request.query.page || 1,
                        limit: request.query.limit || 10,
                    };
                    const data = await TransactionController.getUserTransactions(request.auth.credentials, filters);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'Get transactions',
            notes: 'Returns paginated transactions with filters',
            tags: ['api', 'transactions'],
            auth: STRATEGY.USER,
            validate: {
                query: Joi.object({
                    category: Joi.string().optional(),
                    startDate: Joi.date().optional(),
                    endDate: Joi.date().optional(),
                    minAmount: Joi.number().positive().optional(),
                    maxAmount: Joi.number().positive().optional(),
                    page: Joi.number().integer().min(1).optional(),
                    limit: Joi.number().integer().min(1).max(100).optional(),
                }),
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: STATUS_MSG,
                },
            },
        },
    },
    {
        method: 'PUT',
        path: '/transactions/{id}',
        options: {
            handler: async (request, h) => {
                try {
                    const data = await TransactionController.updateTransaction(request.params.id, request.payload, request.auth.credentials);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'Update transaction',
            notes: 'Updates a transaction by ID',
            tags: ['api', 'transactions'],
            auth: STRATEGY.USER,
            validate: {
                params: Joi.object({
                    id: Joi.string().required(),
                }),
                payload: Joi.object({
                    amount: Joi.number().positive().optional(),
                    category: Joi.string().optional(),
                    date: Joi.date().optional(),
                    description: Joi.string().optional().allow(''),
                }),
                failAction: failActionFunction,
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: STATUS_MSG,
                },
            },
        },
    },
    {
        method: 'DELETE',
        path: '/transactions/{id}',
        options: {
            handler: async (request, h) => {
                try {
                    const data = await TransactionController.deleteTransaction(request.params.id, request.auth.credentials);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'Delete transaction',
            notes: 'Deletes a transaction by ID',
            tags: ['api', 'transactions'],
            auth: STRATEGY.USER,
            validate: {
                params: Joi.object({
                    id: Joi.string().required(),
                }),
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: STATUS_MSG,
                },
            },
        },
    },
];

export default transactionRoutes;
