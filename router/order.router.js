const orderController = require("../controller/order.controller");

const router = require("express").Router();

router
  .post("/", orderController.createOrder)
  .get("/my", orderController.getAllUserOrders)
  .get("/:id", orderController.getOrderById);

module.exports = router;
