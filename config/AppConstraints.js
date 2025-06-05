
export const COMMON_STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED',
};

export const LANGUAGE = {
  EN: 'en',
};

export const STRATEGY = {
  USER: 'user',
};


export const SERVER = {
  SALT: 10,
};


export const STATUS_MSG = {
  ERROR: {
    ENTER_PHONE_OR_EMAIL_FOR_REGISTRATION: {
      statusCode: 400,
      type: 'ENTER_PHONE_OR_EMAIL_FOR_REGISTRATION',
      customMessage: {
        en: 'Please enter your email or phone for registration',
      },
    },

    ENTER_PHONE_OR_EMAIL_FOR_LOGIN: {
      statusCode: 400,
      type: 'ENTER_PHONE_OR_EMAIL_FOR_LOGIN',
      customMessage: {
        en: 'Please enter your email or phone to login',
      },
    },

    INVALID_EMAIL_PROVIDED: {
      statusCode: 400,
      type: 'INVALID_EMAIL_PROVIDED',
      customMessage: {
        en: 'Email provided by you is not valid',
      },
    },


    INVALID_TOKEN: {
      statusCode: 401,
      type: 'INVALID_TOKEN',
      customMessage: {
        en: 'You are not authorized or your session has expired',
      },
    },

    SOMETHING_WENT_WRONG: {
      statusCode: 400,
      type: 'SOMETHING_WENT_WRONG',
      customMessage: {
        en: 'Server is not responding, please try again later',
      },
    },



  },
  SUCCESS: {
    CREATED: {
      statusCode: 200,
      type: 'CREATED',
      customMessage: {
        en: 'Created Successfully',
      },
    },
    DEFAULT: {
      statusCode: 200,
      type: 'DEFAULT',
      customMessage: {
        en: 'Successfully',
      },
    },
  },
};

export const SWAGGER_RESPONSE_MESSAGE = [
  { code: 200, message: 'OK' },
  { code: 400, message: 'Bad Request' },
  { code: 401, message: 'Unauthorized' },
  { code: 404, message: 'Data Not Found' },
  { code: 500, message: 'Internal Server Error' },
];

export const NOTIFICATION_MESSAGES = {};
