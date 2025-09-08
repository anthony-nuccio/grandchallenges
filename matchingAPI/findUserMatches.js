// findUserMatches.js — thin wrapper for external callers (Azure SQL version)
const { findMatches } = require('./findMatches');

async function handler(event = {}) {
  const userId = event.userId || process.env.USER_ID;
  if (!userId) throw new Error('userId is required');
  const sameSchool = event.sameSchool !== false;
  const topN = Number.isFinite(event.topN) ? event.topN : 20;
  const persist = event.persist !== false;
  const results = await findMatches(userId, { sameSchool, topN, persist });
  return { userId, results };
}

module.exports = { handler };
