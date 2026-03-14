const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const jwtValidate = require("../middlewares/jwtValidate");
const adminValidate = require("../middlewares/adminValidate");
const { validateCheckout, validateOrderUpdate } = require("../middlewares/validation/orderValidation");

// User
router.post("/checkout", jwtValidate, validateCheckout, orderController.checkout);
router.get("/my", jwtValidate, orderController.getMyOrders);
// إضافة مسار للإلغاء المباشر للمستخدم
router.patch("/cancel/:id", jwtValidate, orderController.cancelMyOrder);

// Admin
router.get("/", jwtValidate, adminValidate, orderController.getAllOrders);
router.put("/:id", jwtValidate, adminValidate, validateOrderUpdate, orderController.updateOrder);
router.delete("/:id", jwtValidate, adminValidate, orderController.deleteOrder);

module.exports = router;