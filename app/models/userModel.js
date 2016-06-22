import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Create a schema for users
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number, // Must be at least 21
  isAdmin: Boolean, // Value of true allows reporting
  beers: [{
    name: String,
    rating: Number,
    id: Number,
  }],
  dateJoined: Date, // Sign up date
  lastUpdateDate: Date, // Last time account updated
});

export const User = mongoose.model('User', userSchema);
