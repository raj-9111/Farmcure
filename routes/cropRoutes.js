import express from "express";
import multer from "multer";
import { getScan, postScan } from "../controllers/cropController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

const router = express.Router();

// multer config for file uploads
const upload = multer({ dest: "public/uploads/" });

router.get("/", isLoggedIn, getScan);
router.post("/", isLoggedIn, upload.single("image"), postScan);

export default router;
