'use strict';

const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/index');

router
    .get('/', IndexController.index)
    .post('/', IndexController.create)
    .put('/:id', IndexController.update)
    .get('/:id', IndexController.edit)
    .delete('/:id', IndexController.delete)
    .get('/print/viagens', IndexController.printViagens)
    .get('/print/:id', IndexController.print);

module.exports = router;