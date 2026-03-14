const express = require("express");
const router = express.Router();

const serverController = require("../controllers/serverServiceController");
const jwtValidate = require("../middlewares/jwtValidate");
const adminValidate = require("../middlewares/adminValidate");
const validatePagination = require("../middlewares/validation/paginationValidation");

// Public
router.get("/", validatePagination, serverController.getServices);
router.get("/:id", serverController.getServiceById);

// Admin
router.post("/", jwtValidate, adminValidate, serverController.createService);
router.put("/:id", jwtValidate, adminValidate, serverController.updateService);
router.delete("/:id", jwtValidate, adminValidate, serverController.deleteService);

module.exports = router;