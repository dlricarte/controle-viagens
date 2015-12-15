'use strict';

const express = require('express');
const router = express.Router();

const PercursoController = require('../controllers/percurso');

router
    .post('/', PercursoController.create)
    .delete('/:id', PercursoController.delete);

module.exports = router;