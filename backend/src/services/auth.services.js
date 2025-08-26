const bcrypt = require("bcrypt");
const { db } = require("../lib/db.js"); // drizzle db
const { users } = require("../lib/schema"); // your drizzle table
const { eq } = require("drizzle-orm"); // for where clause

const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.js");

/**
 *
 * @param {string} name - Name of user (required)
 * @param {string} email - Email of user (required)
 * @param {string} password - Password of user (required)
 * @returns user details found in DB
 */
exports.registerUser = async ({ name, email, password }) => {
  // 1. Check if user exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error("User Already Exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Save user
  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning();

  return user;
};

/**
 *
 * @param {string} email - Email of user (required)
 * @param {string} password - Password of user (required)
 * @returns user details found in DB + accessToken + refreshToken
 */
exports.loginUser = async ({ email, password }) => {
  // 1. Check if user exists
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Email or Password");
  }

  // 3. Create JWT tokens
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return { user, accessToken, refreshToken };
};

/**
 * @param {string} token - Refresh token which is valid for 15
 * @returns accessToken - new signed token
 */

exports.refreshAccessToken = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new Error("Unauthorized");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, decoded.id))
    .limit(1);

  if (!user) {
    throw new Error("Invalid Token");
  }
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };

  const accessToken = createAccessToken(payload);

  return { accessToken };
};

/**
 * @params none - No processing for logout service
 * @returns true
 */
exports.logoutUser = () => {
  // No DB changes required
  return true;
};
