import { Router } from "express";
import { login, register, me } from "../controllers/authcontroller.js";
import { protect } from "../middlewares/auth.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
export default router;
