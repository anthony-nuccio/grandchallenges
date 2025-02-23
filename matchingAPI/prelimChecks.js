const helperFunctions = require('./helperFunctions');
const { binaryInputMatch } = require('./helperFunctions');
const { checkAgeBelow } = require('./helperFunctions');
const { checkAgeAbove } = require('./helperFunctions');

function locationPrefer(user1, user2) {
    const localPreferOne = user1.location;
    const localPreferTwo = user2.location;

    return binaryInputMatch(localPreferOne, localPreferTwo);
}

function agePrefer(user1, user2) {
    const userAgeOne = user1.age;
    const userAgeTwo = user2.age;

    const userMaxPrefOne = user1.maxAgePref;
    const userMinPrefOne = user1.minAgePref;

    const userMaxPrefTwo = user2.maxAgePref;
    const userMinPrefTwo = user2.minAgePref;

    if (checkAgeBelow(userAgeOne, userMaxPrefTwo) && checkAgeAbove(userAgeOne, userMinPrefTwo)) {
        return checkAgeBelow(userAgeTwo, userMaxPrefOne) && checkAgeAbove(userAgeTwo, userMinPrefOne);
    } else {
        return false;
    }
}

function compatibleGender(user1, user2) {

    const genderOne = user1.gender;
    const genderTwo = user2.gender;

    if (binaryInputMatch(genderOne, genderTwo)) {
        return true;
    } else {
        return false;
    }
}

function prelimChecks(user1, user2) {
    return (
        locationPrefer(user1, user2) &&
        agePrefer(user1, user2) &&
        compatibleGender(user1, user2)
    );
}

module.exports = {
    locationPrefer,
    agePrefer,
    prelimChecks,
    compatibleGender,
};