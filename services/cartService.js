const Cart = require("../models/Cart");
const Service = require("../models/Service");

const addToCart = async (userId, serviceId, quantity = 1) => {
  const service = await Service.findById(serviceId);

  if (!service) {
    throw new Error("Service not found");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.service.toString() === serviceId
  );

  if (existingItem) {
    existingItem.quantity += quantity;

    // ✅ إذا الكمية أصبحت صفر نحذف العنصر
    if (existingItem.quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.service.toString() !== serviceId
      );
    }
  } else {
    cart.items.push({
      service: serviceId,
      quantity,
    });
  }

  await cart.save();

  // ✅ مهم جداً حتى يرجع populated
  return await Cart.findById(cart._id)
    .populate("items.service")
    .lean();
};

const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId })
    .populate("items.service")
    .lean();

  return cart || { items: [] };
};

const removeFromCart = async (userId, serviceId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.service.toString() !== serviceId
  );

  await cart.save();

  return await Cart.findById(cart._id)
    .populate("items.service")
    .lean();
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};