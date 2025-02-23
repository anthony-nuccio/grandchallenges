const preliminaryChecks = require('./prelimChecks');
const fuzzyMatchFunctions = require('./fuzzyMatch');
const helperFunctions = require('./helperFunctions');
const { getUsersFromDatabase } = require('./userRetrieval');
const { findUserMatches } = require('./findMatches');
const {db} = require('../../initalizeFirebase')


async function main() {
    try {
        let users = await getUsersFromDatabase();
        users = await findUserMatches(users, db);
        console.log("calling main")

    } catch (error) {
        console.error('Error in main function:', error);
    }
}

module.exports = {main};