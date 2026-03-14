const express = require("express");
const router = express.Router();

const imeiController = require("../controllers/imeiServiceController");
const jwtValidate = require("../middlewares/jwtValidate");
const adminValidate = require("../middlewares/adminValidate");
const validatePagination = require("../middlewares/validation/paginationValidation");

// Public
router.get("/", validatePagination, imeiController.getServices);
router.get("/:id", imeiController.getService);

// Admin
router.post("/", jwtValidate, adminValidate, imeiController.createService);
router.put("/:id", jwtValidate, adminValidate, imeiController.updateService);
router.delete("/:id", jwtValidate, adminValidate, imeiController.deleteService);

module.exports = router;