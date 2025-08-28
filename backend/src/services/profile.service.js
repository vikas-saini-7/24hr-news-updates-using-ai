const { eq } = require("drizzle-orm");
const { db } = require("../lib/db");
const { users } = require("../lib/schema");

exports.fetchProfile = async ({ userId }) => {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      avatar: users.avatar,
      createdAt: users.created_at,
      updatedAt: users.updated_at,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
