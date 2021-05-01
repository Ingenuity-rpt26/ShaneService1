const mongoose = require('mongoose');

const { Schema } = mongoose;

console.log(process.env.ABOUT_MONGODB_URI + '/' + process.env.ABOUT_DATABASE);
mongoose.connect(process.env.ABOUT_MONGODB_URI + '/' + process.env.ABOUT_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'connected!'));

const descriptionSchema = new Schema({
  course_id: Number,
  recent_views: Number,
  description: String,
  learner_career_outcomes: [{ icon: String, pct: Number, outcome: String }],
  metadata: [{ icon: String, title: String, subtitle: String }],
  what_you_will_learn: [{
    type: String,
  }],
  skills_you_will_gain: [{
    type: String,
  }],
});

module.exports = {
  db,
  descriptionSchema,
};
