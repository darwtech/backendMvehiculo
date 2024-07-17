const express = require('express');
const router = express.Router();
const {
    createVehiculoMantenimiento,
    getVehiculoMantenimientos,
    updateVehiculoMantenimiento,
    filtrarVehiculoMantenimientos,
    checkAndUpdateAlerta
} = require('../controllers/VehiculoMantenimiento.controllers');

router.post('/vehiculo-mantenimientos', createVehiculoMantenimiento);
router.get('/vehiculo-mantenimientos', getVehiculoMantenimientos);
router.put('/vehiculo-mantenimientos/:id', updateVehiculoMantenimiento);
router.get('/vehiculo-mantenimientos/filtrar', filtrarVehiculoMantenimientos);
router.get('/vehiculo-mantenimientos/alertas', checkAndUpdateAlerta);

module.exports = router;
