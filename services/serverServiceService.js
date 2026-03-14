const ServerService = require("../models/ServerService");

/* Create */
const createService = async (data) => {
  return await ServerService.create(data);
};

/* Get All */
const getServices = async (query) => {

  const filter = {};

  if (query.search) {
    filter.name = {
      $regex: query.search,
      $options: "i"
    };
  }

  if (query.category) {
    filter.category = query.category;
  }

  // جلب كل الخدمات بدون pagination
  const services = await ServerService.find(filter)
    .populate("category", "name")
    .sort({ orderIndex: 1 });

  return { services };
};

/* Get By ID */
const getServiceById = async (id) => {

  const service = await ServerService.findById(id)
    .populate("category", "name");

  if (!service) throw new Error("Service not found");

  return service;
};

/* Update */
const updateService = async (id, data) => {

  const service = await ServerService.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!service) throw new Error("Service not found");

  return service;
};

/* Delete */
const deleteService = async (id) => {

  const service = await ServerService.findByIdAndDelete(id);

  if (!service) throw new Error("Service not found");

  return true;
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
};