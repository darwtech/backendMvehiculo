const VehiculoMantenimientoService = require('../services/vehiculoMantenimientoService');

const createVehiculoMantenimiento = async (req, res) => {
    try {
        const vehiculoMantenimiento = await VehiculoMantenimientoService.createVehiculoMantenimiento(req.body);
        res.status(201).json(vehiculoMantenimiento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getVehiculoMantenimientos = async (req, res) => {
    try {
        const vehiculoMantenimientos = await VehiculoMantenimientoService.getVehiculoMantenimientos();
        res.status(200).json(vehiculoMantenimientos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateVehiculoMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const vehiculoMantenimientoActualizado = await VehiculoMantenimientoService.updateVehiculoMantenimiento(id, req.body);
        res.status(200).json(vehiculoMantenimientoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const filtrarVehiculoMantenimientos = async (req, res) => {
    try {
        const { search } = req.query;
        const vehiculoMantenimientos = await VehiculoMantenimientoService.filtrarVehiculoMantenimientos(search);
        res.status(200).json(vehiculoMantenimientos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    createVehiculoMantenimiento,
    getVehiculoMantenimientos,
    updateVehiculoMantenimiento,
    filtrarVehiculoMantenimientos,

};
