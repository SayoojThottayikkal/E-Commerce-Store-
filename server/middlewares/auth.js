import jwt from "jsonwebtoken";
import User from "../models/Usermodel.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    if (!token)
      return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("+password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
    };
    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Admin only" });
};
