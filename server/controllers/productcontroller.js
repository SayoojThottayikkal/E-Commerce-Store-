import mongoose from "mongoose";
import Product from "../models/Productmodel.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createProduct = async (req, res) => {
  try {
    let tags = [];
    if (req.body.tags) {
      tags = Array.isArray(req.body.tags)
        ? req.body.tags.map((t) => t.trim())
        : typeof req.body.tags === "string"
        ? req.body.tags.split(",").map((t) => t.trim())
        : [];
    }

    const product = await Product.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: Number(req.body.price) || 0,
      stock: Number(req.body.stock) || 0,
      tags,
      image: req.file
        ? `/uploads/${req.file.filename}`
        : req.body.image || null,
      soldCount: Number(req.body.soldCount) || 0,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id))
      return res.status(400).json({ message: "Invalid product ID" });

    const updates = { ...req.body };

    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.stock !== undefined) updates.stock = Number(updates.stock);
    if (updates.soldCount !== undefined)
      updates.soldCount = Number(updates.soldCount);

    if (updates.tags) {
      updates.tags = Array.isArray(updates.tags)
        ? updates.tags.map((t) => t.trim())
        : typeof updates.tags === "string"
        ? updates.tags.split(",").map((t) => t.trim())
        : [];
    }

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      updates.image = req.body.image;
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id))
      return res.status(400).json({ message: "Invalid product ID" });

    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id))
      return res.status(400).json({ message: "Invalid product ID" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("Get Product Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const listProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      q = "",
      category,
      minPrice,
      maxPrice,
      sort = "-createdAt",
    } = req.query;

    const filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    console.error("List Products Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const bulkImportCSV = async (req, res) => {
  res.json({ message: "CSV import endpoint placeholder" });
};
