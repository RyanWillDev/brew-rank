const mongoose = require('mongoose');

// Create a schema for users
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }, // Value of true allows reporting
  isLoggedIn: { type: Boolean, required: true, default: false },
  age: { type: Number, required: true, min: 21 }, // Must be at least 21
  beers: [{
    rating: Number,
    id: { type: Schema.Types.ObjectId, ref: 'Beer', isRequired: true },
  }],
  dateJoined: Date, // Sign up date
  lastUpdateDate: Date, // Last time account updated
});

// Run on every save
userSchema.pre('save', function checkDates(next) { // Need function to use this value
  const user = this;                               // of user being saved can't use =>
  const currentDate = new Date(); // Create a new date obj
  // Set the lastUpdateDate field to currentDate
  user.lastUpdateDate = currentDate;

  // If there is no dateJoined field set that to the current date as well
  if (!user.dateJoined) {
    user.dateJoined = currentDate;
  }
  next();
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
