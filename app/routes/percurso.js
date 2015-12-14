'use strict';

const express = require('express');
const router = express.Router();

const PercursoController = require('../controllers/percurso');

router
    .post('/', PercursoController.create);

module.exports = router;