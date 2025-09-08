const { computeSimilarity } = require('./helperFunctions');
const { strSim } = require('./fuzzyMatch');

function scoreIndividual(base, baseTraits, cand, candTraits) {
  let score = 0;

  if (base.budget_min != null && base.budget_max != null &&
      cand.budget_min != null && cand.budget_max != null) {
    const overlap = Math.min(base.budget_max, cand.budget_max) - Math.max(base.budget_min, cand.budget_min);
    if (overlap >= 0) score += Math.min(20, Math.max(0, overlap / 50));
  }

  if (base.location_pref && cand.location_pref && base.location_pref === cand.location_pref) score += 10;

  score += Math.round(30 * computeSimilarity(baseTraits, candTraits));

  score += Math.round(10 * strSim(base.bio, cand.bio));

  return score;
}

module.exports = { scoreIndividual };
