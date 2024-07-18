const VehiculoMantenimiento = require('../models/VehiculoMantenimiento.models');
const Mantenimiento = require('../models/Mantenimiento.models');
const Vehiculo = require('../models/Vehiculo.models');

const createVehiculoMantenimiento = async (data) => {
    const { codigo, placa, fecha, marca_producto, kilometraje,precio } = data;

    // Busca el mantenimiento por código
    const mantenimiento = await Mantenimiento.findOne({ codigo });
    if (!mantenimiento) {
        throw new Error('Mantenimiento no encontrado con el código proporcionado');
    }

    // Busca el vehículo por placa
    const vehiculo = await Vehiculo.findOne({ placa });
    if (!vehiculo) {
        throw new Error('Vehículo no encontrado con la placa proporcionada');
    }

    // Crea la alerta
    const alerta = generateAlerta(mantenimiento.titulo, fecha, kilometraje);

    const vehiculoMantenimiento = new VehiculoMantenimiento({
        fecha,
        codigo,
        placa,
        marca_producto,
        kilometraje,
        alerta,precio
    });

    await vehiculoMantenimiento.save();
    return vehiculoMantenimiento;
};


const generateAlerta = (titulo, fecha, kilometraje) => {
    if (titulo.toLowerCase() === 'cambio de aceite') {
        return `Próximo cambio en ${kilometraje + 5000} km`;
    } else if (titulo.toLowerCase() === 'lavado') {
        const fechaAlerta = new Date(fecha);
        fechaAlerta.setDate(fechaAlerta.getDate() + 12);
        return `Próximo lavado el ${fechaAlerta.toDateString()}`;
    } else {
        return 'Tipo de mantenimiento desconocido';
    }
};


const getVehiculoMantenimientos = async () => {
    return await VehiculoMantenimiento.find();
};

const updateVehiculoMantenimiento = async (id, data) => {
    const { codigo, placa, fecha, marca_producto, kilometraje,precio } = data;

    const mantenimiento = await Mantenimiento.findOne({ codigo });
    if (!mantenimiento) {
        throw new Error('Mantenimiento no encontrado con el código proporcionado');
    }

    const vehiculo = await Vehiculo.findOne({ placa });
    if (!vehiculo) {
        throw new Error('Vehículo no encontrado con la placa proporcionada');
    }

    // Encuentra el mantenimiento del vehículo existente
    const vehiculoMantenimientoExistente = await VehiculoMantenimiento.findById(id);
    if (!vehiculoMantenimientoExistente) {
        throw new Error('Registro de mantenimiento no encontrado');
    }

    // Calcula el nuevo kilometraje
    const nuevoKilometraje = kilometraje;

    // Genera la nueva alerta basada en el tipo de mantenimiento
    const alerta = generateAlerta(mantenimiento.titulo, vehiculoMantenimientoExistente.fecha, nuevoKilometraje);

    // Actualiza el registro de mantenimiento del vehículo
    vehiculoMantenimientoExistente.fecha = fecha;
    vehiculoMantenimientoExistente.codigo = codigo;
    vehiculoMantenimientoExistente.placa = placa;
    vehiculoMantenimientoExistente.marca_producto = marca_producto;
    vehiculoMantenimientoExistente.kilometraje = nuevoKilometraje;
    vehiculoMantenimientoExistente.alerta = alerta;
    vehiculoMantenimientoExistente.precio = precio;

    await vehiculoMantenimientoExistente.save();
    return vehiculoMantenimientoExistente;
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
