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
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  },
  listProducts
);
router.get("/:id", getProduct);

router.post("/", protect, isAdmin, upload.single("image"), createProduct);
router.put("/:id", protect, isAdmin, upload.single("image"), updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.post("/bulk/import", protect, isAdmin, bulkImportCSV);

export default router;
