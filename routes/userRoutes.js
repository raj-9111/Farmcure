import express from "express";
import { getLogin, postLogin, getRegister, postRegister, logoutUser } from "../controllers/authController.js";


const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/register", getRegister);
router.post("/register", postRegister);

router.get("/logout", logoutUser);

export default router;  // ✅ ESM export
