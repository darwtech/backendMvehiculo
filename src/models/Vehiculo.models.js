const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehiculoSchema = new Schema({
    imagen: { type: String, required: true },
    placa: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    anio: { type: Number, required: true }
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);
