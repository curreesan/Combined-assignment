const jwt = require("jsonwebtoken");
const jwtPassword = "secret_key";

/**
 * Generates a "Short-Lived" JWT that expires in 1 minute.
 * * @param {string} username - The user's email.
 * @returns {string} A JWT that will be invalid after 60 seconds.
 */
function signShortLivedToken(username) {
  // Your code here
  const token = jwt.sign({ username }, jwtPassword, { expiresIn: "1m" });
  return token;
}

/**
 * Checks if a token is still valid or has expired.
 * * @param {string} token - The JWT string.
 * @returns {string} Returns "valid", "expired", or "invalid".
 */
function checkTokenStatus(token) {
  // Your code here
  try {
    jwt.verify(token, jwtPassword);
    return "valid";
  } catch (err) {
    if (err.name === "TokenExpiredError") return "expired";
    return "invalid";
  }
}

module.exports = {
  signShortLivedToken,
  checkTokenStatus,
  jwtPassword,
};
