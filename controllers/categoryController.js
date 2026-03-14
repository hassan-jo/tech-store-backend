
const categoryService = require("../services/categoryService");

const getCategories = async (req, res, next) => {
  try {
    const data = await categoryService.getCategories();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const id = req.sanitizedParams.id;

    const data = await categoryService.getCategoryById(id);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const body = req.body;

    const data = await categoryService.createCategory(body);

    res.status(201).json({
      success: true,
      message: "Category created",
      data
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const id = req.sanitizedParams.id;
    const body = req.body;

    const data = await categoryService.updateCategory(id, body);

    res.json({
      success: true,
      message: "Category updated",
      data
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.sanitizedParams.id;

    await categoryService.deleteCategory(id);

    res.json({
      success: true,
      message: "Category deleted"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};

