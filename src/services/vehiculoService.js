const Vehiculo = require('../models/Vehiculo.models');

const createVehiculo = async (data) => {
    const { placa } = data;
    const vehiculoExistente = await Vehiculo.findOne({ placa });

    if (vehiculoExistente) {
        throw new Error('El vehículo con esta placa ya existe');
    }

    const vehiculo = new Vehiculo(data);
    await vehiculo.save();
    return vehiculo;
};

const getVehiculos = async () => {
    return await Vehiculo.find();
};

const updateVehiculo = async (id, data) => {
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(id, data, { new: true });
    if (!vehiculoActualizado) {
        throw new Error('Vehículo no encontrado');
    }
    return vehiculoActualizado;
};

const filtrarVehiculos = async (search) => {
    const regex = new RegExp(search, 'i');
    return await Vehiculo.find({
        $or: [
            { placa: regex },
            { marca: regex },
            { modelo: regex }
        ]
    });
};

const deleteVehiculo = async (id) => {
    const vehiculoEliminado = await Vehiculo.findByIdAndDelete(id);
    if (!vehiculoEliminado) {
        throw new Error('Vehículo no encontrado');
    }
    return vehiculoEliminado;
};

module.exports = {
    createVehiculo,
    getVehiculos,
    updateVehiculo,
    filtrarVehiculos,
    deleteVehiculo
};
