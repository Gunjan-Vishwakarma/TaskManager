const jwt = require("jsonwebtoken");
const User = require("../models/user");

//middleware to protect route
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);
      next();
    } else {
      console.log("User authenticated:", req.user);

      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "token failed", error: error.message });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

module.exports = { protect, adminOnly };
