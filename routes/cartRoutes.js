const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const jwtValidate = require("../middlewares/jwtValidate");
const { validateAddToCart } = require("../middlewares/validation/cartValidation");

// إضافة للكارت
router.post("/", jwtValidate, validateAddToCart, cartController.addToCart);

// جلب الكارت
router.get("/", jwtValidate, cartController.getCart);

// حذف عنصر
router.delete("/:serviceId", jwtValidate, cartController.removeFromCart);

module.exports = router;