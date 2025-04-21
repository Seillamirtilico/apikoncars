const express = require("express");
const router = express.Router(); // Manejador de rutas de Express
const cocheSchema = require("../models/cocheModel");

// Nuevo coche
router.post("/coches", (req, res) => {
    const coche = new cocheSchema(req.body);
    coche
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los coches
router.get("/coches", (req, res) => {
    cocheSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un coche por ID
router.get("/coches/:id", (req, res) => {
    const { id } = req.params;
    cocheSchema
        .findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Coche no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Actualizar un coche por ID
router.put("/coches/:id", (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    cocheSchema
        .findByIdAndUpdate(id, updateData, { new: true }) // new: true devuelve el objeto actualizado
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Coche no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Eliminar un coche por ID
router.delete("/coches/:id", (req, res) => {
    const { id } = req.params;

    cocheSchema
        .findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Coche no encontrado" });
            }
            res.json({ message: "Coche eliminado exitosamente", data });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});


module.exports = router;
