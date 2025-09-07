// middleware/authMiddleware.js
const isLoggedIn = (req, res, next) => {
  if (!req.session || !req.session.user) {
    req.flash("error", "You must be logged in first!");
    return res.redirect("/users/login");
  }
  next();
};

export default isLoggedIn;
