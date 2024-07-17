const express = require('express');
const cors = require('cors');
const connectDB = require('./database/conex');
const vehiculoRoutes = require('./src/routes/vehiculoRoutes');
const mantenimientoRoutes = require('./src/routes/manteniminetoRoutes');
const vehiculoMantenimientoRoutes = require('./src/routes/vehiculoMantenimientoRoutes');

const app = express();


connectDB();


app.use(express.json());


app.use(cors());


app.use('/api', vehiculoRoutes);
app.use('/api', mantenimientoRoutes);
app.use('/api', vehiculoMantenimientoRoutes);

module.exports = app;
