const orderService = require("../services/orderService");
const Order = require("../models/Order");
/* ===============================
   Get User Orders
================================ */
const getMyOrders = async (req, res, next) => {
  try {

    const userId = req.user.userId;

    const data = await orderService.getUserOrders(userId);

    res.json({
      success: true,
      data
    });

  } catch (error) {
    next(error);
  }
};

/* ===============================
   Checkout / Create Order
================================ */
const checkout = async (req, res, next) => {
  try {

    const userId = req.user.userId;

    const data = await orderService.checkout(userId);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data
    });

  } catch (error) {
    next(error);
  }
};

/* ===============================
   Get All Orders (Admin)
================================ */
const getAllOrders = async (req, res, next) => {
  try {

    const data = await orderService.getAllOrders();

    res.json({
      success: true,
      data
    });

  } catch (error) {
    next(error);
  }
};

/* ===============================
   Update Order
================================ */
const updateOrder = async (req, res, next) => {
  try {

    const orderId = req.params.id;

    const data = await orderService.updateOrder(orderId, req.body);

    res.json({
      success: true,
      message: "Order updated",
      data
    });

  } catch (error) {
    next(error);
  }
};

/* ===============================
   Delete Order
================================ */
const deleteOrder = async (req, res, next) => {
  try {

    const orderId = req.params.id;

    await orderService.deleteOrder(orderId);

    res.json({
      success: true,
      message: "Order deleted"
    });

  } catch (error) {
    next(error);
  }
};
// داخل controllers/orderController.js
const cancelMyOrder = async (req, res, next) => {
  try {

    const orderId = req.params.id;
    const userId = req.user.userId;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "غير مسموح لك بإلغاء هذا الطلب" });
    }

    const data = await orderService.updateOrder(orderId, {
      status: "cancelled",
    });

    res.json({
      success: true,
      message: "تم إلغاء الطلب بنجاح",
      data,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkout,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getMyOrders,
  cancelMyOrder
};