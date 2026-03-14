const Category = require("../models/Category");

/* ===============================
   Get Categories
================================ */

const getCategories = async () => {
  return await Category.find().sort("-createdAt");
};

/* ===============================
   Get Category By ID
================================ */

const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

/* ===============================
   Create Category
================================ */

const createCategory = async (data) => {
  return await Category.create(data);
};

/* ===============================
   Update Category
================================ */

const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

/* ===============================
   Delete Category
================================ */

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return true;
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};