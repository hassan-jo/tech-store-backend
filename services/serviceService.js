const Service = require("../models/Service");
const mongoose = require("mongoose");
require("../models/Category");

/* ===============================
   Create Service
================================ */
const createService = async (data) => {
  try {
    const service = await Service.create(data);
    return service;
  } catch (error) {
    throw new Error("Failed to create service");
  }
};

/* ===============================
   Get Services (Filter by category + type)
================================ */
const getServices = async (query) => {
  const { category, type } = query;

  let filter = {};

  if (category && mongoose.Types.ObjectId.isValid(category)) {
    filter.category = new mongoose.Types.ObjectId(category);
  }

  if (type) {
    filter.filterid = Number(type);
  }

  const services = await Service.find(filter).lean();

  return {
    services,
  };
};

/* ===============================
   Get Service By ID
================================ */
const getServiceById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid service id");
  }

  const service = await Service.findById(id)
    .populate("category", "name")
    .lean();

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

/* ===============================
   Update Service
================================ */
const updateService = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid service id");
  }

  const service = await Service.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

/* ===============================
   Delete Service
================================ */
const deleteService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid service id");
  }

  const service = await Service.findByIdAndDelete(id);

  if (!service) {
    throw new Error("Service not found");
  }

  return true;
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
