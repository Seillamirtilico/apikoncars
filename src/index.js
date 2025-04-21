const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cocheRoutes = require("./routes/cocheRoutes");
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware para parsear las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.use("/api", cocheRoutes);

// Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa a MongoDB"))
    .catch((error) => console.log("Error en la conexión:", error));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
