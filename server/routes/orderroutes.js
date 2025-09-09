import { Router } from "express";
import { protect, isAdmin } from "../middlewares/auth.js";
import {
  placeOrder,
  myOrders,
  allOrders,
  updateOrderStatus,
  adminStats,
} from "../controllers/ordercontroller.js";
import { noCache } from "../middlewares/noCache.js";

const router = Router();

router.post("/", protect, placeOrder);
router.get("/mine", protect, noCache, myOrders);

router.get("/", protect, isAdmin, noCache, allOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);
router.get("/stats/summary", protect, isAdmin, noCache, adminStats);

export default router;
