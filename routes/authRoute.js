import Joi from 'joi';
import { failActionFunction, sendError, sendSuccess } from '../utils/response.js';
import AuthController from '../controllers/AuthController.js';
import { LANGUAGE, STATUS_MSG } from '../config/AppConstraints.js';

const authRoutes = [
    {
        method: 'POST',
        path: '/auth/register',
        options: {
            handler: async (request, reply) => {
                try {
                    const data = await AuthController.register(request.payload);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'Register a new user',
            notes: 'Creates a new user and returns a JWT token',
            tags: ['api', 'auth'],
            auth: false,
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(3).max(50).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).required(),
                }),
                failAction: failActionFunction,
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: STATUS_MSG,
                },
            },
        },
    },
    {
        method: 'POST',
        path: '/auth/login',
        options: {
            handler: async (request, reply) => {
                try {
                    const data = await AuthController.login(request.payload);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        data,
                        request.headers['accept-language'] || LANGUAGE.EN
                    );
                } catch (err) {
                    return sendError(err, request.headers['accept-language'] || LANGUAGE.EN);
                }
            },
            description: 'User login',
            notes: 'Logs in user and returns JWT token',
            tags: ['api', 'auth'],
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).required(),
                }),
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

export default authRoutes;
