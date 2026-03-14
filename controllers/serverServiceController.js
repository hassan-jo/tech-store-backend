
const serviceService = require("../services/serverServiceService");

const createService = async (req, res, next) => {
  try {
    const data = await serviceService.createService(req.body);

    res.status(201).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

const getServices = async (req, res, next) => {
  try {
    const query = req.sanitizedQuery || req.query;

    const result = await serviceService.getServices(query);

    res.json({
      success: true,
      services: result.services,
      pagination: result.pagination
    });
  } catch (err) {
    next(err);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const params = req.sanitizedParams || req.params;

    const data = await serviceService.getServiceById(params.id);

    res.json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

const updateService = async (req, res, next) => {
  try {
    const params = req.sanitizedParams || req.params;

    const data = await serviceService.updateService(
      params.id,
      req.body
    );

    res.json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const params = req.sanitizedParams || req.params;

    await serviceService.deleteService(params.id);

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

