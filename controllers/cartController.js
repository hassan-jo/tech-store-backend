const cartService = require("../services/cartService");

const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const serviceId = req.body.serviceId;
    const quantity = req.body.quantity || 1;

    const cart = await cartService.addToCart(userId, serviceId, quantity);

    res.json({
      success: true,
      items: cart.items,
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const cart = await cartService.getCart(userId);

    res.json({
      success: true,
      items: cart.items,
    });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const serviceId = req.params.serviceId;

    const cart = await cartService.removeFromCart(userId, serviceId);

    res.json({
      success: true,
      items: cart.items,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};