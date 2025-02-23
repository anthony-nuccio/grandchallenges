const { findUserMatches } = require('./findUserMatches');
const { getUsersFromDatabase } = require('./userRetrieval');
// const { db } = require('./userRetrieval');
// change this to the database calls within initializeFirebase.js
const {db} = require('../../initalizeFirebase');

async function findIndividualMatches(userId) {
    try {
        const users = await getUsersFromDatabase();
        const currentUser = users.find(user => user.id === userId);

        if (!currentUser) {
            console.error(`User with ID ${userId} not found.`);
            return;
        }

        await findUserMatches(currentUser, users);
        console.log("calling findIndividualMatches");

    } catch (error) {
        console.error('Error in findIndividualMatches function:', error);
    }
}

module.exports = {
    findIndividualMatches,
};