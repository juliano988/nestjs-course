import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

UsersSchema.pre('save', function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const password = this['password'] as string;
    const passwordHash = bcrypt.hashSync(password, 10);
    this['password'] = passwordHash;
  } catch (e) {
    return next(e);
  }
});
