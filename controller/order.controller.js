const OrderService = require("../service/order.service");

const getAllOrders = async (req, res, next) => {};

const createOrder = async (req, res, next) => {
  try {
    const customer = req.user._id;
    const orderData = req.body;
    const order = await OrderService.createOrder({ ...orderData, customer });
    return res.json(order);
  } catch (e) {
    next(e);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    return res.json(order);
  } catch (e) {
    next(e);
  }
};

const getAllUserOrders = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const orders = await OrderService.getAllUserOrders(userId);
    return res.json(orders);
  } catch (e) {
    next(e);
  }
};

module.exports = { getAllOrders, createOrder, getOrderById, getAllUserOrders };
