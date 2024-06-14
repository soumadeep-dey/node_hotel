const jwt = require("jsonwebtoken");

// function to verify authorization
const jwtAuthMiddleware = (req, res, next) => {
  // Check req has auhorization header
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  // Extract the jwt token from the req header
  const token = authorization.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify JWT token
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info to the req object
    req.userPayload = decodedPayload;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

// function to generate JWT token
const generateToken = (userPayload) => {
  return jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { jwtAuthMiddleware, generateToken };
