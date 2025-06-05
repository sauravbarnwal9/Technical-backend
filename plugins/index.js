import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import Pack from '../../package';
import {AUTH_TOKEN} from './authToken';
const swaggerOptions = {
  info: {
    title: Pack.name,
    version: Pack.version,
  },
  schemes: [process.env.NODE_ENV === 'local' ? 'http' : 'https'],
};

export const Plugins = [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
  {
    plugin: AUTH_TOKEN,
    name: AUTH_TOKEN.name,
  },
  {
    plugin: require('hapi-sentry'),
    options: {
      client: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
      },
    },
  },
];
