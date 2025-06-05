import Joi from 'joi';
import SummaryController from '../controllers/summaryController.js';
import { failActionFunction, sendError, sendSuccess } from '../utils/response.js';
import { STATUS_MSG, LANGUAGE } from '../config/AppConstraints.js';
import { STRATEGY } from '../config/AppConstraints.js';

const summaryRoutes = [
    {
        method: 'GET',
        path: '/summary',
        options: {
            handler: async (request, h) => {
                try {
                    const user = request.auth.credentials;
                    const { month } = request.query;

                    const data = await SummaryController.getMonthlySummary(user.id, month);

                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'Get monthly summary',
            notes: 'Returns total income, expenses, budget and balance for a specific month',
            tags: ['api', 'summary'],
            auth: STRATEGY.USER,
            validate: {
                query: Joi.object({
                    month: Joi.string().required().regex(/^\d{4}-\d{2}$/).label('Month').example('2025-06'),
                }),
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
                failAction: failActionFunction,
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: STATUS_MSG,
                },
            },
        },
    },
];

export default summaryRoutes;
