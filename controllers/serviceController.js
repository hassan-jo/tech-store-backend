const serviceService = require("../services/serviceService");

/* ===============================
   Create Service
================================ */
const createService = async (req, res, next) => {
  try {

    const service = await serviceService.createService(req.body);

    res.status(201).json({
      success: true,
      data: service
    });

  } catch (err) {
    next(err);
  }
};

/* ===============================
   Get All Services
================================ */
const getServices = async (req, res, next) => {
  try {

    const result = await serviceService.getServices(req.query);

    res.json({
      success: true,
      services: result.services
    });

  } catch (err) {
    next(err);
  }
};

/* ===============================
   Get Service By ID
================================ */
const getServiceById = async (req, res, next) => {
  try {

    const service = await serviceService.getServiceById(req.params.id);

    res.json({
      success: true,
      data: service
    });

  } catch (err) {
    next(err);
  }
};

/* ===============================
   Update Service
================================ */
const updateService = async (req, res, next) => {
  try {

    const service = await serviceService.updateService(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: service
    });

  } catch (err) {
    next(err);
  }
};

/* ===============================
   Delete Service
================================ */
const deleteService = async (req, res, next) => {
  try {

    await serviceService.deleteService(req.params.id);

    res.json({
      success: true,
      message: "Service deleted"
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
};