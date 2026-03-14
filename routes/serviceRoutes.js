// routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const jwtValidate = require("../middlewares/jwtValidate");
const adminValidate = require("../middlewares/adminValidate");
const { validateCreateService, validateUpdateService } = require("../middlewares/validation/serviceValidation");
const validatePagination = require("../middlewares/validation/paginationValidation");

// ✅ تم حذف الـ sanitize لمنع خطأ "Cannot set property query"
// الحماية الآن تتم مركزياً في app.js

// Public Routes
router.get("/", validatePagination, serviceController.getServices);
router.get("/:id", serviceController.getServiceById);

// Admin Routes
router.post(
  "/", 
  jwtValidate, 
  adminValidate, 
  validateCreateService, 
  serviceController.createService
);

router.put(
  "/:id", 
  jwtValidate, 
  adminValidate, 
  validateUpdateService, 
  serviceController.updateService
);

router.delete(
  "/:id", 
  jwtValidate, 
  adminValidate, 
  serviceController.deleteService
);

module.exports = router;