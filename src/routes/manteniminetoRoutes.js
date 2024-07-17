const express = require('express');
const router = express.Router();
const {
    createMantenimiento,
    getMantenimientos,
    updateMantenimiento,
    filtrarMantenimientos
} = require('../controllers/Matenimiento.controllers');

router.post('/mantenimientos', createMantenimiento);
router.get('/mantenimientos', getMantenimientos);
router.put('/mantenimientos/:id', updateMantenimiento);
router.get('/mantenimientos/filtrar', filtrarMantenimientos);

module.exports = router;
