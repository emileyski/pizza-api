const mongoose = require("mongoose");

// Схема для элемента корзины (OrderItem)
const orderItemSchema = new mongoose.Schema({
  pizzaId: { type: Number, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

// Схема для заказа (Order)
const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Ссылка на модель User
  phone: { type: String, required: true },
  status: { type: String, required: true, default: "preparing" },
  address: { type: String, required: true },
  priority: { type: Boolean, default: false }, // По умолчанию false, можно изменить в зависимости от вашей бизнес-логики
  estimatedDelivery: { type: Date, required: true, default: new Date() },
  cart: [orderItemSchema], // Массив элементов корзины (OrderItem)
  orderCreated: { type: Date, default: new Date() },
  priorityPrice: {
    type: Number,
    required: true,
    default: function () {
      // Если поле priority равно true, возвращаем 20% от orderPrice, иначе 0
      return this.priority ? this.orderPrice * 0.2 : 0;
    },
  },
  orderPrice: {
    type: Number,
    required: true,
    default: function () {
      // Вычисляем сумму стоимости всех элементов корзины
      return this.cart.reduce((total, item) => total + item.totalPrice, 0);
    },
  },
});

// Определение виртуального поля customerName
orderSchema.virtual("customerName").get(function () {
  return this.customer.fullname;
});

// Создаем модель Order на основе схемы
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
