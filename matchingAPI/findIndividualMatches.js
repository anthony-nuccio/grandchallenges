const { getUserById, getUserTraits, getCandidatePoolForUser } = require('./azure-sql/userRepository');
const { scoreIndividual } = require('./individualMatch');

async function findIndividualMatches(userId, { sameSchool = true, topN = 20 } = {}) {
  const base = await getUserById(userId);
  const baseTraits = await getUserTraits(userId);
  const pool = await getCandidatePoolForUser(userId, { sameSchool, limit: 1000 });

  const results = [];
  for (const c of pool) {
    const ct = await getUserTraits(c.user_id);
    const score = scoreIndividual(base, baseTraits, c, ct);
    results.push({ userId: c.user_id, score, candidate: c });
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topN);
}

module.exports = { findIndividualMatches };
