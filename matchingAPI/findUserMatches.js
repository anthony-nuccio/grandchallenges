const { computeRatio } = require('./fuzzyMatch');
const { prelimChecks } = require('./prelimChecks');
const { sortMatchArray } = require('./helperFunctions');

const {db} = require('../../initalizeFirebase');

async function findUserMatches(currentUser, users) {
    try {
        const targetUserId = currentUser.id;

        const currentMatches = [];

        for (const user of users) {
            if (user.id !== targetUserId && prelimChecks(currentUser, user)) {
                console.log("Prelim checks passed");
                let matchScore = computeRatio(currentUser, user);

                const matchDataUser1 = {
                    matchScore: matchScore,
                    userOneEmail: currentUser.email,
                    userOneInterest: 'empty',
                    userTwoEmail: user.email,
                    userTwoInterest: 'empty',
                };

                const matchDataUser2 = {
                    matchScore: matchScore,
                    userOneEmail: user.email,
                    userOneInterest: 'empty',
                    userTwoEmail: currentUser.email,
                    userTwoInterest: 'empty',
                };

                currentMatches.push(matchDataUser1);
                currentMatches.push(matchDataUser2);
            }
        }

        sortMatchArray(currentMatches);
        currentUser.possibleMatches = [...currentMatches];
        console.log(`Matches for ${currentUser.email}:`, currentMatches);

        for (const match of currentMatches) {
            const possibleMatchesRef = db.collection('possibleMatch');
            possibleMatchesRef.add(match);
        }
    } catch (error) {
        console.error('Error finding matches:', error);
    }
}

module.exports = {
    findUserMatches,
};