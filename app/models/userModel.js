const mongoose = require('mongoose');

// Create a schema for users
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }, // Value of true allows reporting
  isLoggedIn: { type: Boolean, required: true, default: false },
  age: { type: Number, required: true }, // Must be at least 21
  beers: [{
    name: String,
    rating: Number,
    id: Number,
  }],
  dateJoined: Date, // Sign up date
  lastUpdateDate: Date, // Last time account updated
});

// Run on every save
userSchema.pre('save', (next) => {
  const currentDate = new Date(); // Create a new date obj
  // Set the lastUpdateDate field to currentDate
  this.lastUpdateDate = currentDate;

  // If there is no dateJoined field set that to the current date as well
  if (!this.dateJoined) {
    this.dateJoined = currentDate;
  }
  next();
});

// Creat and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
