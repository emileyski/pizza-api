const menuService = require("../service/menu.service");

const getMenu = async (req, res, next) => {
  try {
    const menu = await menuService.getMenu();
    return res.json(menu);
  } catch (e) {
    next(e);
  }
};
const getPizzaById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pizza = await menuService.getPizzaById(id);
    return res.json(pizza);
  } catch (e) {
    next(e);
  }
};

module.exports = { getMenu, getPizzaById };
