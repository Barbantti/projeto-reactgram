const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("-------- AUTH GUARD: ", authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  // Check if header has a token
  if (!token) {
    console.log("401");
    return res.status(401).json({ errors: ["Access denied!"] });
  }
  // Check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = await User.findById(verified.id).select("-password");
    next();
  } catch (error) {
    console.log("Caiu no jwt erro:", error);
    res.status(401).json({ errors: ["Invalid token."] });
  }
};

module.exports = authGuard;
