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
  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required", 400);
  }
  // 1. Check if user exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new AppError("User already exists", 409);
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

  if (!user) {
    throw new AppError("Failed to create user", 500);
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
 *
 * @param {string} email - Email of user (required)
 * @param {string} password - Password of user (required)
 * @returns user details found in DB + accessToken + refreshToken
 */
exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  // 1. Check if user exists
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
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
    throw new AppError("Refresh token is required", 400);
  }

  const decoded = verifyRefreshToken(refreshToken);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, decoded.id))
    .limit(1);

  if (!user) {
    throw new AppError("User not found", 404);
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
