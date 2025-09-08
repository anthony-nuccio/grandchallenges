function ensureUserHasBasics(user) {
  if (!user) throw new Error('User not found');
  if (!user.email) throw new Error('User missing email');
  return true;
}

module.exports = { ensureUserHasBasics };
