const {
  generateEmail,
  generateMinAge,
  generatePetAllergies,
  generateBinaryResponse,
  generateAge,
  generateLocation,
  generateScaleValue,
  generateBudget,
  generateClass,
  generateMaxAge,
  generateNicotinePref,
  generateAlcoholPref,
  generatePersonalityPref,
  generateWeedPref,
  generateBinaryLabel,
  generateVisitPref,
  generateRandomGender,
  generateRandomMajor,
} = require('./generateDataFunctions');

const admin = require('firebase-admin');
const serviceAccount = require('./testroomieradar-firebase-adminsdk-abb9j-f46fcd07fa.json');

admin.initializeApp({ 
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/project/testroomieradar/database'
});

const db = admin.firestore();
const faker = require('faker');

const generateFakeUsers = async () => {
  const usersBatch = db.batch();

  for (let i = 0; i < 19; i++) {
    const fakeEmail = generateEmail();

    const fakeProfileData = {
      id: faker.random.uuid(),
      age: generateAge(),
      gender: generateRandomGender(),
      alcoholUse: generateScaleValue(),
      budget: generateBudget(),
      canabisUse: generateScaleValue(),
      class: generateClass(),
      cleanliness: generateScaleValue(),
      email: fakeEmail,
      firstName: faker.name.firstName(),
      greekLife: generateBinaryResponse(),
      lastName: faker.name.lastName(),
      location: generateLocation(),
      major: generateRandomMajor(),
      petStatus: generateBinaryResponse(),
      sleepScheduleBegin: generateScaleValue(),
      sleepScheduleEnd: generateScaleValue(),
      smoker: generateScaleValue(),
      testUser: 1,
    };

    const fakeSurveyData = {
      alcoholUsePref: generateAlcoholPref(),
      allergenStatusPref: generateBinaryLabel(),
      canabisUsePref: generateWeedPref(),
      email: fakeEmail,
      friendVisitOvernightPref: generateBinaryLabel(),
      friendVisitPref: generateBinaryLabel(),
      friendVisitTimesPref: [],
      greekLifePref: generateBinaryLabel(),
      minAgePref: generateMinAge(),
      maxAgePref: generateMaxAge(),
      partnerOvernightVisitPref: generateBinaryLabel(),
      partnerVisitPref: generateBinaryLabel(),
      partnerVisitTimesPref: [],
      personalityPref: generatePersonalityPref(),
      petAllergies: generatePetAllergies(),
      petStatusPref: generateBinaryLabel(),
      smokingPref: generateNicotinePref(),
    };

    if (fakeSurveyData.friendVisitPref.value === 'yes') {
      fakeSurveyData.friendVisitTimesPref = generateVisitPref();
    } else {
      fakeSurveyData.friendVisitTimesPref = [];
    }
    
    if (fakeSurveyData.partnerVisitPref.value === 'yes') {
      fakeSurveyData.partnerVisitTimesPref = generateVisitPref();
    } else {
      fakeSurveyData.partnerVisitTimesPref = [];
    }

    const profileRef = db.collection('profile').doc();
    const surveyRef = db.collection('survey').doc();

    usersBatch.set(profileRef, fakeProfileData);
    usersBatch.set(surveyRef, fakeSurveyData);
  }

  await usersBatch.commit();
  console.log('Fake users generated and stored successfully.');
};

generateFakeUsers().catch(error => console.error('Error generating fake users:', error));