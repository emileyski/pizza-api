const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  fullname: { type: String, required: true },
  password: { type: String, required: false },
  photoLink: { type: String },
  provider: {
    type: String,
    enum: ["google", "local", "facebook"],
    required: true, // Или можно установить false, в зависимости от вашей логики
  },
});

module.exports = mongoose.model("User", UserSchema);
