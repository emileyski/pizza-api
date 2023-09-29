const { getPizzaById, getMenu } = require("../controller/menu.controller");

const router = require("express").Router();

router.get("/", getMenu).get("/:id", getPizzaById);

module.exports = router;
