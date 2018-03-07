import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import Debug from 'debug';

import user from './routes/user';
import authentication from './routes/authentication';
import temperature from './routes/temperature';
import session from './middleware/session';
import authenticator from './middleware/authenticator';
import config from './config';

const debug = Debug('ciai:app');
const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

mongoose.connect(config.DB_CONNECTION_STRING, {}, (err) => {
  if (err) {
    debug('Error connecting to mongodb');
  } else {
    debug('Connected to db');
  }
});

app.use(logger('dev', {
  skip: () => app.get('env') === 'test',
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(session());
app.use(authenticator);

// Routes

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

app.use('/api/user', user);
app.use('/api/authentication', authentication);
app.use('/api/temperature', temperature);

app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message,
      error: err,
    });
});

export default app;
