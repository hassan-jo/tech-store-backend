// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const jwtValidate = require("../middlewares/jwtValidate");
const adminValidate = require("../middlewares/adminValidate");

// ملاحظة: تم حذف الـ sanitize middleware من هنا لأنه بيسبب تعارض
// مع النظام الجديد في app.js وبيؤدي لخطأ Internal Server Error

// Public Routes
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

// Admin Routes
router.post("/", jwtValidate, adminValidate, categoryController.createCategory);

router.put(
  "/:id",
  jwtValidate,
  adminValidate,
  categoryController.updateCategory,
);

router.delete(
  "/:id",
  jwtValidate,
  adminValidate,
  categoryController.deleteCategory,
);

module.exports = router;
