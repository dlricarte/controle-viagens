'use strict';

const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/index');

/* GET home page. */
router
    .get('/', IndexController.index)
    .post('/', IndexController.create)
    .put('/', IndexController.update)
    .get('/:id', IndexController.edit)
    .delete('/:id', IndexController.delete);

module.exports = router;