
const imeiServiceService = require("../services/imeiServiceService");

const getServices = async (req, res) => {
  try {
    const result = await imeiServiceService.getServices(req.query);

    res.json({
      success: true,
      services: result.services || [],
      pagination: result.pagination || {
        page: 1,
        limit: result.services ? result.services.length : 0,
        total: result.services ? result.services.length : 0,
        pages: 1,
      },
    });
  } catch (error) {
    console.error("Get IMEI services error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

const getService = async (req, res) => {
  try {
    const service = await imeiServiceService.getServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get IMEI service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};

const createService = async (req, res) => {
  try {
    const service = await imeiServiceService.createService(req.body);

    res.status(201).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Create IMEI service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create service",
    });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await imeiServiceService.updateService(
      req.params.id,
      req.body,
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Update IMEI service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await imeiServiceService.deleteService(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete IMEI service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
};

