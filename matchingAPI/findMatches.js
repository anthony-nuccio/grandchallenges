const { upsertMatch } = require('./azure-sql/matchRepository');
const { findIndividualMatches } = require('./findIndividualMatches');

async function findMatches(userId, { sameSchool = true, topN = 20, persist = true } = {}) {
  const scored = await findIndividualMatches(userId, { sameSchool, topN: topN * 3 });

  const top = scored.slice(0, topN);
  if (persist) {
    for (const m of top) {
      await upsertMatch(userId, m.userId, m.score, 'Computed via individualMatch + fuzzy + traits');
    }
  }
  return top;
}

module.exports = { findMatches };
