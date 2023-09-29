const { Router } = require("express");
const authRouter = require("./auth.router");
const orderRouter = require("./order.router");
const menuRouter = require("./menu.router");

const router = new Router();

router
  .use("/auth", authRouter)
  .use("/order", orderRouter)
  .use("/menu", menuRouter);

module.exports = router;
