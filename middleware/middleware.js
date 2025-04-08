const jwt = require("jsonwebtoken");
const db = require("../database/db");

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, user) => {
      if (err || !user) {
        console.error(err);
        return res.redirect("/login");
      }

      req.user = user;
      // console.log("authMiddleware",req.user);
      next();

    });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
}

module.exports = authMiddleware;
