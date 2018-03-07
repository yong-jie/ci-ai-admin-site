import mongoose, { Schema } from 'mongoose';

const UserSchema = Schema({
  username: { type: String, required: true }, // NRIC number
  name: { type: String },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  authorization: {
    type: String,
    required: true,
    enum: ['Student', 'Teacher', 'Admin'],
  },
  hashedPassword: { type: String },
  authorizedTokens: [{ id: String, expiry: Date }],
});

export default mongoose.model('User', UserSchema);
