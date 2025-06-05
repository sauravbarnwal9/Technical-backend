import Joi from 'joi';
import { failActionFunction, sendError, sendSuccess } from '../utils/response.js';
import { STATUS_MSG, LANGUAGE, STRATEGY } from '../config/AppConstraints.js';
import { authorizationHeader } from '../utils/universal.js';
import BudgetController from '../controllers/budgetController.js';

const budgetRoutes = [
    {
        method: 'POST',
        path: '/budget',
        options: {
            handler: async (request, h) => {
                try {
                    const data = await BudgetController.setBudget(request.payload, request.auth.credentials);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'Set monthly budget',
            notes: 'Sets or updates user monthly budget',
            tags: ['api', 'budget'],
            auth: STRATEGY.USER,
            validate: {
                payload: Joi.object({
                    amount: Joi.number().positive().required(),
                    month: Joi.string().required(), // Format: YYYY-MM
                }),
                failAction: failActionFunction,
                headers: authorizationHeader,
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
        path: '/budget',
        options: {
            handler: async (request, h) => {
                try {
                    const data = await BudgetController.getBudget(request.auth.credentials);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'Get monthly budget',
            notes: 'Gets current month budget of user',
            tags: ['api', 'budget'],
            auth: STRATEGY.USER,

            validate: {
                headers: authorizationHeader,
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: STATUS_MSG,
                },
            },
        },
    },
];

export default budgetRoutes;
