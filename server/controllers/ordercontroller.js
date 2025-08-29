import Order from "../models/Ordermodel.js";
import Product from "../models/Productmodel.js";

export const placeOrder = async (req, res) => {
  const { items, shippingAddress } = req.body;
  if (!items?.length) return res.status(400).json({ message: "No items" });

  const lineItems = [];
  let total = 0;

  for (const it of items) {
    const p = await Product.findById(it.productId);
    if (!p || p.stock < it.qty)
      return res
        .status(400)
        .json({ message: `Insufficient stock for ${it?.title || p?.title}` });
    p.stock -= it.qty;
    p.soldCount += it.qty;
    await p.save();
    lineItems.push({
      product: p._id,
      title: p.title,
      price: p.price,
      qty: it.qty,
      image: p.image,
    });
    total += p.price * it.qty;
  }

  const order = await Order.create({
    user: req.user.id,
    items: lineItems,
    shippingAddress,
    total,
  });
  res.status(201).json(order);
};

export const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
  res.json(orders);
};

export const allOrders = async (req, res) => {
  const { status, from, to } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (from || to)
    filter.createdAt = {
      ...(from && { $gte: new Date(from) }),
      ...(to && { $lte: new Date(to) }),
    };
  const orders = await Order.find(filter)
    .populate("user", "name email")
    .sort("-createdAt");
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  order.status = req.body.status || order.status;
  await order.save();
  res.json(order);
};

export const adminStats = async (req, res) => {
  const byDay = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
        revenue: { $sum: "$total" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const bestSellers = await Product.find()
    .sort("-soldCount")
    .limit(5)
    .select("title soldCount");
};
