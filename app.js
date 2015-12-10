'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Database connection handler
require('./config/mongoose');

// Static resources
app.use('/static', express.static(__dirname + '/app/public'));

// View engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// Routes config
require('./config/routes')(app);

module.exports = app;