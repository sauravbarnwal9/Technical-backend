import Joi from 'joi';
import CategoryController from '../controllers/categoryController.js';
import { failActionFunction, sendError, sendSuccess } from '../utils/response.js';
import { STATUS_MSG, LANGUAGE } from '../config/AppConstraints.js';

const categoryRoutes = [
    {
        method: 'POST',
        path: '/categories',
        options: {
            handler: async (request, h) => {
                try {
                    const data = await CategoryController.addCategory(request.payload, request.auth.credentials);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'Add a new category',
            notes: 'Creates a new category for the authenticated user',
            tags: ['api', 'categories'],
            auth: 'jwt',
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(1).max(50).required(),
                    type: Joi.string().valid('income', 'expense').required(),
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
        path: '/categories',
        options: {
            handler: async (request, h) => {
                try {
                    const data = await CategoryController.getCategories(request.auth.credentials);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'Get all categories',
            notes: 'Returns all categories of the authenticated user',
            tags: ['api', 'categories'],
            auth: 'jwt',
            validate: {
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

export default categoryRoutes;
