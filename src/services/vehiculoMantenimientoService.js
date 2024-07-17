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

    const alerta = generateAlerta(mantenimiento.titulo, fecha, kilometraje);

    const vehiculoMantenimiento = new VehiculoMantenimiento({
        fecha,
        codigo,
        placa,
        marca_producto,
        kilometraje,
        alerta
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
        .populate('codigo', 'titulo descripcion')
        .populate('placa', 'imagen placa marca modelo');
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

    const alerta = generateAlerta(mantenimiento.titulo, fecha, kilometraje);

    const vehiculoMantenimientoActualizado = await VehiculoMantenimiento.findByIdAndUpdate(
        id,
        {
            fecha,
            codigo,
            placa,
            marca_producto,
            kilometraje,
            alerta
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

const checkAndUpdateAlerta = async () => {
    const vehiculosMantenimiento = await VehiculoMantenimiento.find().populate('codigo');
    const updates = vehiculosMantenimiento.map(async vm => {
        if (vm.codigo.titulo.toLowerCase() === 'cambio de aceite') {
            const nuevaAlerta = generateAlerta(vm.codigo.titulo, vm.fecha, vm.kilometraje);
            if (vm.alerta !== nuevaAlerta) {
                vm.alerta = nuevaAlerta;
                await vm.save();
            }
        }
    });
    await Promise.all(updates);
};

module.exports = {
    createVehiculoMantenimiento,
    getVehiculoMantenimientos,
    updateVehiculoMantenimiento,
    filtrarVehiculoMantenimientos,
    checkAndUpdateAlerta
};
