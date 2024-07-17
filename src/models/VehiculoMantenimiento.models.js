const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehiculoMantenimientoSchema = new Schema({
    fecha: { type: Date, required: true },
    codigo: { type: String, required: true },
    placa: { type: String, required: true },
    marca_producto: { type: String, required: true },
    kilometraje: { type: Number, required: true },
    alerta: { type: String, required: true }
});

module.exports = mongoose.model('VehiculoMantenimiento', vehiculoMantenimientoSchema);
