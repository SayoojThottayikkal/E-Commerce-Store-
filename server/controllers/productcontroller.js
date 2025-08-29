import Product from "../models/Productmodel.js";

export const createProduct = async (req, res) => {
  const prod = await Product.create(req.body);
  res.status(201).json(prod);
};

export const updateProduct = async (req, res) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!prod) return res.status(404).json({ message: "Product not found" });
  res.json(prod);
};

export const deleteProduct = async (req, res) => {
  const prod = await Product.findByIdAndDelete(req.params.id);
  if (!prod) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Deleted" });
};

export const getProduct = async (req, res) => {
  const prod = await Product.findById(req.params.id);
  if (!prod) return res.status(404).json({ message: "Product not found" });
  res.json(prod);
};

export const listProducts = async (req, res) => {
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
  if (minPrice || maxPrice)
    filter.price = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    };

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
};

export const bulkImportCSV = async (req, res) => {
  res.json({ message: "CSV import endpoint placeholder" });
};
