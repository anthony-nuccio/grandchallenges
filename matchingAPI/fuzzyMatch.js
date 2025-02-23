const helperFunctions = require('./helperFunctions');

const {
  binaryInputMatch,
  isGreaterValue,
  isSmallerValue,
  arrayMatching,
  valueScoreResult,
  budgetScaleResult,
  binaryScoreResult
} = helperFunctions;

function alcoholUsePrefer(user1, user2) {
  const alcoholPreferOne = user1.alcoholUse;
  const alcoholPreferTwo = user2.alcoholUse;

  const greaterValue = isGreaterValue(alcoholPreferOne, alcoholPreferTwo);
  const smallerValue = isSmallerValue(alcoholPreferOne, alcoholPreferTwo);

  return valueScoreResult(greaterValue, smallerValue);
}

function weedUsePrefer(user1, user2) {

  const weedPreferOne = user1.liveWithWeed;
  const weedPreferTwo = user2.liveWithWeed;

  const greaterValue = isGreaterValue(weedPreferOne, weedPreferTwo);
  const smallerValue = isSmallerValue(weedPreferOne, weedPreferTwo);

  return valueScoreResult(greaterValue, smallerValue);
}

function smokerPrefer(user1, user2) {
  const smokerPreferOne = user1.liveWithSmoker;
  const smokerPreferTwo = user2.liveWithSmoker;

  return valueScoreResult(smokerPreferOne, smokerPreferTwo);
}

function cleanPrefer(user1, user2) {
  const cleanPreferOne = user1.clean;
  const cleanPreferTwo = user2.clean;

  const greaterValue = isGreaterValue(cleanPreferOne, cleanPreferTwo);
  const smallerValue = isSmallerValue(cleanPreferOne, cleanPreferTwo);

  return valueScoreResult(greaterValue, smallerValue);
}

function wakeUpPrefer(user1, user2) {
  const wakeUpPreferOne = user1.wakeUp;
  const wakeUpPreferTwo = user2.wakeUp;

  const greaterValue = isGreaterValue(wakeUpPreferOne, wakeUpPreferTwo);
  const smallerValue = isSmallerValue(wakeUpPreferOne, wakeUpPreferTwo);

  return valueScoreResult(greaterValue, smallerValue);
}

function goToBedPrefer(user1, user2) {
  const sleepPreferOne = user1.goToBed;
  const sleepPreferTwo = user2.goToBed;

  const greaterValue = isGreaterValue(sleepPreferOne, sleepPreferTwo);
  const smallerValue = isSmallerValue(sleepPreferOne, sleepPreferTwo);

  return valueScoreResult(greaterValue, smallerValue);
}

function bothInGreek(user1, user2) {
  const isGreekOne = user1.greekLife;
  const isGreekTwo = user2.greekLife;

  return binaryScoreResult(isGreekOne, isGreekTwo);
}

function petPrefer(user1, user2) {
    const petPreferOne = user1.canLiveWithPet;
    const petPreferTwo = user2.canLiveWithPet;
  
    return binaryInputMatch(petPreferOne, petPreferTwo);
}

function petCompatibility(user1, user2) {
    const hasPetOne = user1.pet;
    const hasPetTwo = user2.pet;
  
    const preferPets = petPrefer(user1, user2);
  
    if (preferPets !== undefined) {
      if (preferPets && (hasPetOne === "yes" || hasPetTwo === "yes")) {
        return 2;
      } else {
        return 0;
      }
    }
    return 0;
  }

function canLiveWithGreek(user1, user2) {
  const liveWithGreekOne = user1.liveWithGreek;
  const liveWithGreekTwo = user2.liveWithGreek;

  if (binaryInputMatch(liveWithGreekOne, liveWithGreekTwo)) {
    return 2;
  } else if (liveWithGreekOne === 'yes' && liveWithGreekTwo === '0') {
    return 2;
  } else if (liveWithGreekOne === '0' && liveWithGreekTwo === 'yes') {
    return 2;
  } else {
    return 0;
  }
}

function friendsCanVisit(user1, user2) {
  const friendVisitPrefOne = user1.canHaveFriends;
  const friendVisitPrefTwo = user2.canHaveFriends;

  return binaryScoreResult(friendVisitPrefOne, friendVisitPrefTwo);
}

function friendDayVisit(user1, user2) {
  const friendPrefTimesOne = user1.friendPrefScale;
  const friendPrefTimesTwo = user2.friendPrefScale;

  return arrayMatching(friendPrefTimesOne, friendPrefTimesTwo);
}

function friendOvernightVisit(user1, user2) {
  const friendOvernightPrefOne = user1.friendOvernight;
  const friendOvernightPrefTwo = user2.friendOvernight;

  return binaryScoreResult(friendOvernightPrefOne, friendOvernightPrefTwo);
}

function partnerCanVisit(user1, user2) {
  const partnerVisitPrefOne = user1.canHavePartner;
  const partnerVisitPrefTwo = user2.canHavePartner;

  return binaryScoreResult(partnerVisitPrefOne, partnerVisitPrefTwo);
}

function partnerDayVisit(user1, user2) {
  const partnerPrefTimesOne = user1.partnerPrefScale;
  const partnerPrefTimesTwo = user2.partnerPrefScale;

  return arrayMatching(partnerPrefTimesOne, partnerPrefTimesTwo);
}

function partnerOvernightVisit(user1, user2) {
  const partnerOvernightPrefOne = user1.partnerOvernight;
  const partnerOvernightPrefTwo = user2.partnerOvernight;

  return binaryScoreResult(partnerOvernightPrefOne, partnerOvernightPrefTwo);
}

function budgetPrefer(user1, user2) {
    const budgetOne = user1.budget;
    const budgetTwo = user2.budget;

    if (budgetOne !== undefined && budgetTwo !== undefined) {
        const greaterValue = isGreaterValue(budgetOne, budgetTwo);
        const smallerValue = isSmallerValue(budgetOne, budgetTwo);

        return budgetScaleResult(greaterValue, smallerValue);
    }
}

function computeRatio(user1, user2) {
  let compatibilityScore = 0;

  compatibilityScore += budgetPrefer(user1, user2);
  compatibilityScore += alcoholUsePrefer(user1, user2);
  compatibilityScore += wakeUpPrefer(user1, user2);
  compatibilityScore += goToBedPrefer(user1, user2);
  compatibilityScore += friendsCanVisit(user1, user2);
  compatibilityScore += friendDayVisit(user1, user2);
  compatibilityScore += friendOvernightVisit(user1, user2);
  compatibilityScore += partnerCanVisit(user1, user2);
  compatibilityScore += partnerDayVisit(user1, user2);
  compatibilityScore += partnerOvernightVisit(user1, user2);
  compatibilityScore += petCompatibility(user1, user2);
  compatibilityScore += bothInGreek(user1, user2);
  compatibilityScore += weedUsePrefer(user1, user2);
  compatibilityScore += smokerPrefer(user1, user2);
  compatibilityScore += canLiveWithGreek(user1, user2);

  return compatibilityScore;
}

module.exports = {
  wakeUpPrefer,
  goToBedPrefer,
  cleanPrefer,
  canLiveWithGreek,
  alcoholUsePrefer,
  weedUsePrefer,
  smokerPrefer,
  friendDayVisit,
  partnerDayVisit,
  friendOvernightVisit,
  partnerOvernightVisit,
  petCompatibility,
  computeRatio,
  budgetPrefer,
  friendsCanVisit,
  partnerCanVisit,
  petPrefer,
};