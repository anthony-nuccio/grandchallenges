function normalizeBudget(min, max) {
  if (min == null || max == null) return null;
  if (min > max) [min, max] = [max, min];
  return { min, max };
}

function computeSimilarity(aTraits, bTraits) {
  const a = new Map(aTraits.map(t => [t.trait_key, String(t.trait_value)]));
  const b = new Map(bTraits.map(t => [t.trait_key, String(t.trait_value)]));
  const keys = new Set([...a.keys(), ...b.keys()]);
  let inter = 0, union = 0;
  for (const k of keys) {
    union++;
    if (a.has(k) && b.has(k) && a.get(k) === b.get(k)) inter++;
  }
  return union ? inter / union : 0;
}

module.exports = {
  normalizeBudget,
  computeSimilarity,
};
