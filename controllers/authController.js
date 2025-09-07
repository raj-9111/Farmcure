// controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";



// GET login page
export const getLogin = (req, res) => {
  res.render("login");
};

// POST login
export const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ email: username });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/users/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/users/login");
    }

    req.session.user = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      picture: user.picture || null,
    };
    req.flash("success", "Login successful");
    res.redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/users/login");
  }
};

// GET register page
export const getRegister = (req, res) => {
  res.render("register");
};

// POST register
export const postRegister = async (req, res) => {
  try {
    const { fullname, email, password, contact } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullname,
      email,
      contact,
      password: hashedPassword,
    });

    await user.save();
    req.flash("success", "Registration successful! Please login.");
    res.redirect("/users/login");
  } catch (err) {
    console.error("Register error:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/users/register");
  }
};

// Logout
export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
