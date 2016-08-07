const mongoose = require('mongoose');

const beerSchema = mongoose.Schema({
  name: { type: String, isRequired: true },
  description: String,
  brewery: { type: String, isRequired: true },
  abv: Number, // Alcohol by volume
  color: String,
  style: { type: String, isRequired: true }, // IPA, Stout, etc
  rating: { type: Number, isRequired: true }, // The beer's rating from users,
  userRating: [],
  ingredients: [],
  inStock: { type: Boolean, required: true, default: false },
});

// Create and export the Beer model
const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
