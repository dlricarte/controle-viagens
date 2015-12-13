'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const favicon = require('serve-favicon');
const flash = require('flash');
const session = require('express-session');
const methodOverride = require('method-override');
const moment = require('moment');

const app = express();

app.locals.moment = moment;

app.use(helmet());
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Method override
app.use(methodOverride('_method'));

// Database connection handler
require('./config/mongoose');

// Favicon
app.use(favicon(__dirname + '/app/public/favicon.ico'));

// Static resources
app.use('/static', express.static(__dirname + '/app/public'));

// View engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// Flash messages
app.use(session({ secret: 'whatever' })); // Depends on session
app.use(flash());

// Routes config
require('./config/routes')(app);

module.exports = app;