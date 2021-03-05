const mongoose = require('mongoose');
const axios = require('axios');
const { descriptionSchema } = require('./db.js');

const Description = mongoose.model('Description', descriptionSchema);

const generateRandomPercentage = () => (Math.floor(Math.random() * 100) / 100);

const generateNumberWithinRange = (min, max) => (Math.floor(Math.random() * (max - min) + min));

const generateFillerParas = async () => {
  const text = await axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text');
  return text.data;
};

const generateLanguageList = () => {
  const chosenLanguages = [];
  const languages = [
    'Arabic',
    'French',
    'Portuguese (European)',
    'Chinese (Simplified)',
    'Italian',
    'Vietnamese',
    'German',
    'Russian',
    'English',
    'Hebrew',
    'Spanish',
    'Hindi',
    'Japanese',
    'Turkish',
    'Gujarati',
    'Polish',
    'Persian',
    'Kannada',
    'Romanian',
  ];
  const numberOfLangsToUse = generateNumberWithinRange(0, languages.length);
  for (let i = 0; i < numberOfLangsToUse; i++) {
    const randomLanguageIndex = generateNumberWithinRange(0, languages.length);
    chosenLanguages.push(languages.splice(randomLanguageIndex, 1)[0]);
  }
  return chosenLanguages;
};

const generateLearnerCareerOutcomes = () => {
  const outcomes = [
    {
      icon: 'fa-map-signs',
      pct: generateRandomPercentage(),
      outcome: 'started a new career after completing these courses',
    },
    {
      icon: 'fa-briefcase',
      pct: generateRandomPercentage(),
      outcome: 'got a tangible career benefit from this course',
    },
    {
      icon: 'fa-money',
      pct: generateRandomPercentage(),
      outcome: 'got a pay increase or promotion',
    },
  ];

  return outcomes;
};

const generateMetadata = () => {
  const randomHours = generateNumberWithinRange(20, 200);
  const subtitleLanguages = `Subtitles: ${generateLanguageList().join(', ')}`;
  const icons = [
    {
      icon: 'certificate',
      title: 'Shareable Certificate',
      subtitle: 'Earn a Certificate upon completion',
    },
    {
      icon: 'globe',
      title: '100% online',
      subtitle: 'Start instantly and learn at your own schedule',
    },
    {
      icon: 'calendar',
      title: 'Flexible Deadlines',
      subtitle: 'Reset deadlines in accordance to your schedule',
    },
    {
      icon: 'clock',
      title: `Approx. ${randomHours} hours to complete`,
      subtitle: '',
    },
    {
      icon: 'speechbubble',
      title: 'English',
      subtitle: subtitleLanguages,
    },
  ];
  return icons;
};

const generateRecords = async () => {
  const records = [];
  for (let i = 1; i < 10; i++) {
    const item = {
      course_id: i, // 1 - 100
      recent_views: Math.floor(Math.random() * 1000000), // Random number between 0 and 1 million
      // eslint-disable-next-line no-await-in-loop
      description: await generateFillerParas(), // Bacon ipsum - 4 paragraphs
      learner_career_outcomes: generateLearnerCareerOutcomes(),
      metadata: generateMetadata(),
    };
    records.push(item);
  }
  return records;
};

const seedDatabase = async () => {
  const records = await generateRecords();
  Description.insertMany(records, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  });
};

// on setTimeout to allow database to fully connect
setTimeout(seedDatabase, 500);
