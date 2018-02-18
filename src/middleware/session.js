import session from 'express-session';
import connectMongo from 'connect-mongo';
import config from '../../config';

const MongoStore = connectMongo(session);

const initSession = () => session({
  secret: config.SESSION_SECRET,
  store: new MongoStore({
    url: config.DB_CONNECTION_STRING,
  }),
  saveUninitialized: false,
  resave: false,
});

export default initSession;
