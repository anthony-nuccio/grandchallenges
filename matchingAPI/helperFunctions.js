function valueInputMatch(greaterValue, smallerValue) {

    if (greaterValue === smallerValue) {
        return true;
    } else if (Math.abs(greaterValue - smallerValue) <= 1) {
        return true;
    } else {
        return false;
    }
}

function binaryInputMatch(valueOne, valueTwo) {
    return valueOne === valueTwo;
}

function isGreaterValue(valueOne, valueTwo) {
    const largerValue = Math.max(valueOne, valueTwo);
    return largerValue;
}

function isSmallerValue(valueOne, valueTwo) {
    const smallerValue = Math.min(valueOne, valueTwo);
    return smallerValue;
}

function arrayMatching(arrayOne, arrayTwo) {
    const timeOfDayOptions = ["morning", "afternoon", "evening", "night"];

    const matchingElements = timeOfDayOptions.filter((timeOfDay) => {
        return arrayOne.includes(timeOfDay) && arrayTwo.includes(timeOfDay);
    });

    const sum = matchingElements.length * 2;

    return sum;
}

function valueScoreResult(greaterValue, smallerValue) {
    if (valueInputMatch(greaterValue, smallerValue)) {
        return 2;
    } else {
        return 0;
    }
}

function binaryScoreResult(valueOne, valueTwo) {
    if (binaryInputMatch(valueOne, valueTwo)) {
        return 2;
    } else {
        return 0;
    }
}

function budgetScaleResult(greaterValue, smallerValue) {

    if (greaterValue - smallerValue >= 500) {
        return 10;
    } else if (greaterValue - smallerValue >= 1000) {
        return 8;
    } else if (greaterValue - smallerValue >= 1500) {
        return 6;
    } else if (greaterValue - smallerValue >= 2000) {
        return 4;
    } else if (greaterValue - smallerValue >= 2500) {
        return 2;
    } else if (greaterValue - smallerValue >= 3000) {
        return 1;
    } else { 
        return 0;
    }
}

function sortMatchArray(matchesArray) {
    matchesArray.sort((a, b) => b.matchScore - a.matchScore);
}

function checkAgeBelow(userAge, maxAge) {
    return userAge <= maxAge;
}

function checkAgeAbove(userAge, minAge) {
    return userAge >= minAge;
}

module.exports = {
    valueInputMatch,
    binaryInputMatch,
    isGreaterValue,
    isSmallerValue,
    arrayMatching,
    valueScoreResult,
    sortMatchArray,
    checkAgeAbove,
    checkAgeBelow,
    budgetScaleResult,
    binaryScoreResult
};