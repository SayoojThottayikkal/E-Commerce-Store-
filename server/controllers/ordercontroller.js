import Order from "../models/Ordermodel.js";
import Product from "../models/Productmodel.js";

export const placeOrder = async (req, res) => {
  try {
    if (!req.user?.id)
      return res.status(401).json({ message: "User not found in request" });

    const { items, shippingAddress, total, paymentMethod } = req.body;

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await Order.create({
      user: req.user.id,
      orderNumber,
      items: items.map((it) => ({
        product: it.product,
        qty: it.qty,
        title: it.title,
        price: it.price,
        image: it.image,
      })),
      shippingAddress,
      total,
      paymentMethod,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Place order error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const allOrders = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order" });
  }
};

export const adminStats = async (req, res) => {
  try {
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

    res.json({ byDay, bestSellers });
  } catch (err) {
    res.status(500).json({ message: "Failed to get stats" });
  }
};
