const mongoose = require('mongoose');
const { Schema } = mongoose;

const mantenimientoSchema = new Schema({
    codigo: { type: String, required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true }
});

module.exports = mongoose.model('Mantenimiento', mantenimientoSchema);
