const MantenimientoService = require('../services/mantenimientoService');

const createMantenimiento = async (req, res) => {
    try {
        const mantenimiento = await MantenimientoService.createMantenimiento(req.body);
        res.status(201).json(mantenimiento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMantenimientos = async (req, res) => {
    try {
        const mantenimientos = await MantenimientoService.getMantenimientos();
        res.status(200).json(mantenimientos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const mantenimientoActualizado = await MantenimientoService.updateMantenimiento(id, req.body);
        res.status(200).json(mantenimientoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const filtrarMantenimientos = async (req, res) => {
    try {
        const { search } = req.query;
        const mantenimientos = await MantenimientoService.filtrarMantenimientos(search);
        res.status(200).json(mantenimientos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMantenimiento,
    getMantenimientos,
    updateMantenimiento,
    filtrarMantenimientos
};
