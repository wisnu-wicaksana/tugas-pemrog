const {
  findUserByGoogleId,
  findUserByEmail,
  createUser,
} = require('../repositories/auth.repository');

const findOrCreateUserFromGoogle = async (profile) => {
  const googleId = profile.id;
  const email = profile.emails[0].value;
  const name = profile.displayName;

  let user = await findUserByGoogleId(googleId);
  if (!user) {
    const existing = await findUserByEmail(email);
    if (existing) {
      user = await prisma.user.update({
        where: { id: existing.id },
        data: { googleId },
      });
    } else {
      user = await createUser({ email, name, googleId });
    }
  }

  return user;
};

module.exports = { findOrCreateUserFromGoogle };
