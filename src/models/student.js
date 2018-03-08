import mongoose, { Schema } from 'mongoose';

const StudentSchema = Schema({
  username: { type: String, required: true }, // NRIC number
  name: { type: String },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  childOf: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  temperatures: [{
    value: { type: Number },
    time: { type: Date },
  }],
});

export default mongoose.model('Student', StudentSchema);
