const mongoose = require("mongoose");

// Создаем схему для данных пиццы
const pizzaSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  imageUrl: { type: String },
  ingredients: [{ type: String }],
  soldOut: { type: Boolean, required: true },
});

// Создаем модель на основе схемы
const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
