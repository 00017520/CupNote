const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.token; 
  if (!token) {
    return res.redirect("/login"); 
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; 
    next(); 
  } catch (err) {
    console.error(err);
    res.redirect("/login"); 
  }
}

module.exports = authMiddleware;
