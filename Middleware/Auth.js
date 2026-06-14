const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "Please login",
    });
  }

  try {
    const ogtoken = token.split(" ")[1];
    const data = jwt.verify(
      ogtoken,
      process.env.JWT_SECRET
    );
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = auth;  