import { Router } from "express";
import { protect, isAdmin } from "../middlewares/auth.js";
import {
  placeOrder,
  myOrders,
  allOrders,
  updateOrderStatus,
  adminStats,
} from "../controllers/ordercontroller.js";

const router = Router();

router.post("/", protect, placeOrder);
router.get("/mine", protect, myOrders);

router.get("/", protect, isAdmin, allOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);
router.get("/stats/summary", protect, isAdmin, adminStats);

export default router;
