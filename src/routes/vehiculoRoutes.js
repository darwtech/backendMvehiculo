const express = require('express');
const router = express.Router();
const {
    createVehiculo,
    getVehiculos,
    updateVehiculo,
    filtrarVehiculos,
    deleteVehiculo
} = require('../controllers/Vehiculo.controllers');

router.post('/vehiculos', createVehiculo);
router.get('/vehiculos', getVehiculos);
router.put('/vehiculos/:id', updateVehiculo);
router.get('/vehiculos/filtrar', filtrarVehiculos);
router.delete('/vehiculos/:id', deleteVehiculo);

module.exports = router;
