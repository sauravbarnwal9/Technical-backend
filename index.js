import 'dotenv/config';
import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import HapiJwt from '@hapi/jwt';
import { Routes } from './routes/index.js';

const init = async () => {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
        // add options if needed
    });

  const server = Hapi.server({
  port: process.env.PORT || 5000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['http://localhost:3000'], // your React app's origin
      credentials: true,
      additionalHeaders: ['authorization', 'content-type'],
      additionalExposedHeaders: ['authorization'],
    },
  },
});




    // Register hapi jwt plugin
    await server.register(HapiJwt);

    // Register JWT auth strategy called 'user'
    server.auth.strategy('user', 'jwt', {
        keys: process.env.JWT_SECRET,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15,
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: artifacts.decoded.payload, // your JWT payload
            };
        },
    });

    // Optional: set default auth strategy if all routes use it
    server.auth.default('user');

    // Register routes
    server.route(Routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
