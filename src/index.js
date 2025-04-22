const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();

const cocheRoutes = require("./routes/cocheRoutes");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/coches", cocheRoutes);
app.use("/api/auth", authRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.log("Error en la conexión:", error));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});