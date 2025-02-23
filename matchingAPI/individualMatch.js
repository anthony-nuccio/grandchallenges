const preliminaryChecks = require('./prelimChecks');
const fuzzyMatchFunctions = require('./fuzzyMatch');
const helperFunctions = require('./helperFunctions');
const { getUsersFromDatabase } = require('./userRetrieval');
const { findUserMatches } = require('./findUserMatches');
const { findIndividualMatches } = require('./findIndividualMatches');
// const { db } = require('./userRetrieval');
const {db} = require('../../initalizeFirebase');

async function individualMatch(userId) {
    try {
        const users = await getUsersFromDatabase();
        const currentUser = users.find(user => user.id === userId);

        if (!currentUser) {
            console.error(`User with ID ${userId} not found.`);
            return;
        }

        await findUserMatches(currentUser, users, db);
        console.log("calling individualMatch");

    } catch (error) {
        console.error('Error in individualMatch function:', error);
    }
}

const userId = process.argv[2];

if (!userId) {
    console.error('Please provide a user ID (email) as a command line argument.');
} else {
    findIndividualMatches(userId);
}

module.exports = {
    individualMatch,
};