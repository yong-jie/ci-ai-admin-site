import mongoose from 'mongoose';
import Debug from 'debug';

import { createUser } from './controllers/user';
import { createStudent } from './controllers/student';

import User from './models/user';
import Student from './models/student';
import config from './config';

const debug = Debug('ciai:app');

mongoose.connect(config.DB_CONNECTION_STRING, {}, (err) => {
  if (err) {
    debug('Error connecting to mongodb');
  } else {
    debug('Connected to db');
  }
});

const initializeData = async () => {

  // Create Admin user.
  const admin = await createUser('admin', 'Male', 'Admin', 'password');

  // Create Parent user.
  const parent = await createUser('parent', 'Male', 'Parent', 'password')

  // Create Teacher user.
  const teacher = await createUser('teacher', 'Male', 'Teacher', 'password');

  // Create students.
  let i = 0;
  while (i < 10) {
    await createStudent(`S000000${i}`, 'Male', `Student${i}`, [teacher._id]);
    i++;
  }
  console.log('done');
};

initializeData();
