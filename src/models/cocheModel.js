const mongoose = require("mongoose");

const cocheSchema = mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  año: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  tipoCombustible: {
    type: String,
    enum: ["Gasolina", "Diésel", "Eléctrico", "Híbrido"],
    required: true,
  },
  transmision: {
    type: String,
    enum: ["Manual", "Automática"],
    required: true,
  },
  kilometraje: {
    type: Number,
    required: true,
  },
  puertas: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Coche", cocheSchema);
