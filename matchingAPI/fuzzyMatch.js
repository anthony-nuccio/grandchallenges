// fuzzyMatch.js — example fuzzy helpers; no Firebase usage.
function strSim(a, b) {
  if (!a || !b) return 0;
  a = String(a).toLowerCase();
  b = String(b).toLowerCase();
  if (a === b) return 1;
  // Simple token overlap heuristic
  const as = new Set(a.split(/\W+/).filter(Boolean));
  const bs = new Set(b.split(/\W+/).filter(Boolean));
  const all = new Set([...as, ...bs]);
  let inter = 0;
  for (const t of all) if (as.has(t) && bs.has(t)) inter++;
  return all.size ? inter / all.size : 0;
}

module.exports = { strSim };
