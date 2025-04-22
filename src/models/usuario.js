
const mongoose = require("mongoose");

// usuario.js
const usuarioSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


module.exports = mongoose.model("Usuario", usuarioSchema);
