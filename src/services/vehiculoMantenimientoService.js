const VehiculoMantenimiento = require('../models/VehiculoMantenimiento.models');
const Mantenimiento = require('../models/Mantenimiento.models');
const Vehiculo = require('../models/Vehiculo.models');

const createVehiculoMantenimiento = async (data) => {
    const { codigo, placa, fecha, marca_producto, kilometraje } = data;

    const mantenimiento = await Mantenimiento.findOne({ codigo });
    if (!mantenimiento) {
        throw new Error('Mantenimiento no encontrado con el código proporcionado');
    }

    const vehiculo = await Vehiculo.findOne({ placa });
    if (!vehiculo) {
        throw new Error('Vehículo no encontrado con la placa proporcionada');
    }

    const vehiculoMantenimiento = new VehiculoMantenimiento({
        fecha,
        codigo,
        placa,
        marca_producto,
        kilometraje,
        alerta: generateAlerta(mantenimiento.titulo, fecha, kilometraje)
    });

    await vehiculoMantenimiento.save();
    return vehiculoMantenimiento;
};

const generateAlerta = (titulo, fecha, kilometraje) => {
    if (titulo.toLowerCase() === 'cambio de aceite') {
        return `Próximo cambio en ${kilometraje + 5000} km`;
    } else if (titulo.toLowerCase() === 'lavado') {
        const fechaAlerta = new Date(fecha);
        fechaAlerta.setDate(fechaAlerta.getDate() + 30);
        return `Próximo lavado el ${fechaAlerta.toDateString()}`;
    } else {
        return 'Tipo de mantenimiento desconocido';
    }
};

const getVehiculoMantenimientos = async () => {
    return await VehiculoMantenimiento.find()
        .populate('id_mantenimiento')
        .populate('id_vehiculo');
};

const updateVehiculoMantenimiento = async (id, data) => {
    const { codigo, placa, fecha, marca_producto, kilometraje } = data;

    const mantenimiento = await Mantenimiento.findOne({ codigo });
    if (!mantenimiento) {
        throw new Error('Mantenimiento no encontrado con el código proporcionado');
    }

    const vehiculo = await Vehiculo.findOne({ placa });
    if (!vehiculo) {
        throw new Error('Vehículo no encontrado con la placa proporcionada');
    }

    const vehiculoMantenimientoActualizado = await VehiculoMantenimiento.findByIdAndUpdate(
        id,
        {
            fecha,
            codigo,
            placa,
            marca_producto,
            kilometraje,
            alerta: generateAlerta(mantenimiento.titulo, fecha, kilometraje)
        },
        { new: true }
    );

    if (!vehiculoMantenimientoActualizado) {
        throw new Error('Registro de mantenimiento no encontrado');
    }
    return vehiculoMantenimientoActualizado;
};

const filtrarVehiculoMantenimientos = async (search) => {
    const regex = new RegExp(search, 'i');
    return await VehiculoMantenimiento.find({
        $or: [
            { marca_producto: regex },
            { alerta: regex },
            { codigo: regex },
            { placa: regex }
        ]
    });
};

module.exports = {
    createVehiculoMantenimiento,
    getVehiculoMantenimientos,
    updateVehiculoMantenimiento,
    filtrarVehiculoMantenimientos
};
