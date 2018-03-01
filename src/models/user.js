import mongoose, { Schema } from 'mongoose';
import { config } from '../config';

const UserSchema = Schema({
  username: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  authorization: {
    type: String,
    required: true,
    enum: config.ALL_POSSIBLE_USER_AUTHORIZATIONS,
  },
  hashedPassword: { type: String },
  authorizedTokens: [{ id: String, expiry: Date }],
});

export default mongoose.model('User', UserSchema);
