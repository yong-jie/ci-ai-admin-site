const config = {
  DB_CONNECTION_STRING: 'mongodb://127.0.0.1/ciai_database',
  SESSION_SECRET: 'test', // TODO: Change this upon production.
  ALL_POSSIBLE_USER_AUTHORIZATIONS: ['Student', 'Teacher', 'Admin'],
  USER_AUTHORIZATIONS_THAT_CAN_LOGIN: ['Teacher', 'Admin'],
};

export default config;
