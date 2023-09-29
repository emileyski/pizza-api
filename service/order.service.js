const Order = require("../model/order.model");

class OrderService {
  async createOrder(orderData) {
    const order = await Order.create(orderData);
    return order;
  }

  async getOrderById(id) {
    const order = await Order.findById(id);

    return order;
  }

  async getAllUserOrders(userId) {
    const orders = await Order.find({ customer: userId });

    return orders;
  }
}

module.exports = new OrderService();
