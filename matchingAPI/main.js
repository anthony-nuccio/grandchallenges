const { findMatchesForUser } = require('./azure-sql/matchService');

async function run() {
  try {
    const userId = process.env.USER_ID || 'test-user';
    const sameSchool = process.env.SAME_SCHOOL !== 'false';
    const topN = parseInt(process.env.TOP_N || '20', 10);
    const persist = process.env.PERSIST !== 'false';

    const results = await findMatchesForUser(userId, { sameSchool, persist, topN });
    console.log(JSON.stringify({ userId, count: results.length, results }, null, 2));
  } catch (err) {
    console.error('[RoomieRadar] Fatal error:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  run();
}

module.exports = { run };