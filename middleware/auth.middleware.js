const jwt = require("jsonwebtoken");

const UserAuth = (req, res, next) => {
  try {
    const token =
      req.cookies?.uid;

    if (!token) {
      return res.status(400).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid or expired token." });
  }
};

const FinanceDeptAuth = (req, res, next) => {
  try {
    const token =
      req.cookies?.uid ;

    if (!token) {
      return res.status(400).json({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if((decoded.dept !== "Finance")) return res.status(400).json({ message: "Dept not authorised!" });

    req.user = decoded;

    next(); 
  } catch (error) {
    return res.status(500).json({ message: "Invalid or expired token." });
  }
};




module.exports = {FinanceDeptAuth,UserAuth};
