const VehiculoService = require('../services/vehiculoService');

const createVehiculo = async (req, res) => {
    try {
        const vehiculo = await VehiculoService.createVehiculo(req.body);
        res.status(201).json(vehiculo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getVehiculos = async (req, res) => {
    try {
        const vehiculos = await VehiculoService.getVehiculos();
        res.status(200).json(vehiculos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const vehiculoActualizado = await VehiculoService.updateVehiculo(id, req.body);
        res.status(200).json(vehiculoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const filtrarVehiculos = async (req, res) => {
    try {
        const { search } = req.query;
        const vehiculos = await VehiculoService.filtrarVehiculos(search);
        res.status(200).json(vehiculos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        await VehiculoService.deleteVehiculo(id);
        res.status(204).json(); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createVehiculo,
    getVehiculos,
    updateVehiculo,
    filtrarVehiculos,
    deleteVehiculo
};
