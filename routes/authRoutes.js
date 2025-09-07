const express = require("express");
const { getLogin, getRegister, postRegister, postLogin, logout } = require("../controllers/authController");
const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/register", getRegister);
router.post("/register", postRegister);

router.get("/logout", logout);

module.exports = router;
