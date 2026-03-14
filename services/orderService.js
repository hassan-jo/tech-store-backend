const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Service = require("../models/Service");

const checkout = async (userId) => {

  const cart = await Cart.findOne({ user: userId })
    .populate("items.service");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  for (const item of cart.items) {

    const service = item.service;

    if (service.stock < item.quantity) {
      throw new Error(`${service.name} out of stock`);
    }

    service.stock -= item.quantity;

    await service.save();
  }

  const items = cart.items.map(item => ({
    service: item.service._id,
    quantity: item.quantity,
    price: item.service.price
  }));

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: userId,
    items,
    totalPrice: total,
    status: "pending"
  });

  cart.items = [];
  await cart.save();

  return await Order.findById(order._id)
    .populate("items.service")
    .lean();
};

const getUserOrders = async (userId) => {

  return await Order.find({ user: userId })
    .populate("items.service")
    .sort("-createdAt");

};

const getAllOrders = async () => {

  return await Order.find()
    .populate("user")
    .populate("items.service")
    .sort("-createdAt");

};

const updateOrder = async (orderId, data) => {

  const order = await Order.findById(orderId)
    .populate("items.service");

  if (!order) {
    throw new Error("Order not found");
  }

  // إذا تم إلغاء الطلب نرجع المخزون
  if (data.status === "cancelled" && order.status !== "cancelled") {

    for (const item of order.items) {

      const service = await Service.findById(item.service._id);

      if (service) {
        service.stock += item.quantity;
        await service.save();
      }

    }

  }

  order.status = data.status;

  await order.save();

  return order;
};

const deleteOrder = async (orderId) => {

  const order = await Order.findByIdAndDelete(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  return true;
};

module.exports = {
  checkout,
  getUserOrders,
  getAllOrders,
  updateOrder,
  deleteOrder
};