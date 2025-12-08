const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing token" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { userId, department, role, ... }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireDepartment = (dept) => (req, res, next) => {
  if (!req.user || req.user.department !== dept) {
    return res.status(403).json({ message: "Forbidden: not authorized" });
  }
  next();
};

module.exports = { verifyJWT, requireDepartment };
