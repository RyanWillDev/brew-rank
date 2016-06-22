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

// Run on every save
userSchema.pre('save', function(next) {
  const currentDate = new Date(); // Create a new date obj
  // Set the lastUpdateDate field to currentDate
  this.lastUpdateDate = currentDate;

  // If there is no dateJoined field set that to the current date as well
  if (!this.dateJoined) {
    this.dateJoined = currentDate;
  }

  next();
});

export const User = mongoose.model('User', userSchema);
