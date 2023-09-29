const Pizza = require("../model/pizza.model");

class MenuService {
  async getMenu() {
    const pizzas = await Pizza.find({}); // Возвращает все пиццы из базы данных
    return pizzas;
  }
  async getPizzaById(id) {
    const pizza = await Pizza.find({ id });
    return { pizza };
  }
}

module.exports = new MenuService();
