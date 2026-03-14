const ImeiService = require("../models/ImeiService");

/* Create */
const createService = async (data) => {
  return await ImeiService.create(data);
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

  const services = await ImeiService.find(filter)
    .populate("category", "name")
    .sort({ orderIndex: 1 }); // ترتيب فقط بدون pagination

  return {
    services
  };
};

/* Get By ID */
const getServiceById = async (id) => {
  const service = await ImeiService.findById(id)
    .populate("category", "name");

  if (!service) throw new Error("Service not found");

  return service;
};

/* Update */
const updateService = async (id, data) => {
  const service = await ImeiService.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!service) throw new Error("Service not found");

  return service;
};

/* Delete */
const deleteService = async (id) => {
  const service = await ImeiService.findByIdAndDelete(id);

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