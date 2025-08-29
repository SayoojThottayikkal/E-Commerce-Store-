import { Router } from "express";
import { protect, isAdmin } from "../middlewares/auth.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts,
  bulkImportCSV,
} from "../controllers/productcontroller.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);

// Admin
router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.post("/bulk/import", protect, isAdmin, bulkImportCSV);

export default router;
