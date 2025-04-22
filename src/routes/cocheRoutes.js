const express = require("express");
const router = express.Router();
const cocheSchema = require("../models/cocheModel");
const verifyToken = require("../middleware/verifyToken"); //  Importar middleware

// Nuevo coche (protegido)
router.post("/coches", verifyToken, (req, res) => {
    const coche = new cocheSchema(req.body);
    coche
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los coches (protegido)
router.get("/coches", verifyToken, (req, res) => {
    cocheSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un coche por ID (protegido)
router.get("/coches/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    cocheSchema
        .findById(id)
        .then((data) => {
            if (!data) return res.status(404).json({ message: "Coche no encontrado" });
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Actualizar un coche por ID (protegido)
router.put("/coches/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    cocheSchema
        .findByIdAndUpdate(id, updateData, { new: true })
        .then((data) => {
            if (!data) return res.status(404).json({ message: "Coche no encontrado" });
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Eliminar un coche por ID (protegido)
router.delete("/coches/:id", verifyToken, (req, res) => {
    const { id } = req.params;

    cocheSchema
        .findByIdAndDelete(id)
        .then((data) => {
            if (!data) return res.status(404).json({ message: "Coche no encontrado" });
            res.json({ message: "Coche eliminado exitosamente", data });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
