// Combined into a single file here to make testing more consistent
// Allows testing the seed functions without the database
const path = require('path');
require(path.join(__dirname, "..", 'environments', 'envLoader.js'));


const mongoose = require('mongoose');
const { seedDatabase } = require('./seedFunctions');
const { descriptionSchema } = require('./db.js');

const Description = mongoose.model('Description', descriptionSchema);

seedDatabase(Description);
