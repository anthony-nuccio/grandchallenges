const { computeRatio } = require('./fuzzyMatch');
const { prelimChecks } = require('./prelimChecks');
const { sortMatchArray } = require('./helperFunctions'); 
const {db} = require('../../initalizeFirebase');

async function findUserMatches(users, database) {
    const currentUsers = JSON.parse(JSON.stringify(users));

    for (let i = 0; i < currentUsers.length; i++) {
        const user1 = currentUsers[i];
        const currentMatches = [];
    
        for (let j = i + 1; j < currentUsers.length; j++) {
            const user2 = currentUsers[j];
    
            if (prelimChecks(user1, user2)) {
                console.log("Prelim checks passed");
                let matchScore = computeRatio(user1, user2);
    
                const matchDataUser1 = {
                    matchScore: matchScore,
                    userOneEmail: user1.email,
                    userOneInterest: 'empty',
                    userTwoEmail: user2.email,
                    userTwoInterest: 'empty',
                };

                const matchDataUser2 = {
                    matchScore: matchScore,
                    userOneEmail: user2.email,
                    userOneInterest: 'empty',
                    userTwoEmail: user1.email,
                    userTwoInterest: 'empty',
                };
    
                currentMatches.push(matchDataUser1);
                currentMatches.push(matchDataUser2);
            }
        }
        sortMatchArray(currentMatches);
        user1.possibleMatches = [...currentMatches];
        console.log(`Matches for ${user1.email}:`, currentMatches);
    
        for (const match of currentMatches) {
            const possibleMatchesRef = db.collection('possibleMatch');
            possibleMatchesRef.add(match);
        }
    }
};

module.exports = {
    findUserMatches,
};