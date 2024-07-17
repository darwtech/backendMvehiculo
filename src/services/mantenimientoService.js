const Mantenimiento = require('../models/Mantenimiento.models');

const createMantenimiento = async (data) => {
    const { codigo, titulo, descripcion } = data;
    const mantenimientoExistente = await Mantenimiento.findOne({ codigo });

    if (mantenimientoExistente) {
        throw new Error('El mantenimiento con este código ya existe');
    }

    const mantenimiento = new Mantenimiento(data);
    await mantenimiento.save();
    return mantenimiento;
};

const getMantenimientos = async () => {
    return await Mantenimiento.find();
};

const updateMantenimiento = async (id, data) => {
    const mantenimientoActualizado = await Mantenimiento.findByIdAndUpdate(id, data, { new: true });
    if (!mantenimientoActualizado) {
        throw new Error('Mantenimiento no encontrado');
    }
    return mantenimientoActualizado;
};

const filtrarMantenimientos = async (search) => {
    const regex = new RegExp(search, 'i');
    return await Mantenimiento.find({
        $or: [
            { codigo: regex },
            { titulo: regex },
            { descripcion: regex }
        ]
    });
};

module.exports = {
    createMantenimiento,
    getMantenimientos,
    updateMantenimiento,
    filtrarMantenimientos
};
