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
const DateUtils = require('./app/utils/date');
const CurrencyUtils = require('./app/utils/currency');
const ArrayUtils = require('./app/utils/array');

const app = express();

app.locals.DateUtils = DateUtils;
app.locals.CurrencyUtils = CurrencyUtils;
app.locals.ArrayUtils = ArrayUtils;

app.use(helmet());
app.use(cors());

app.use(logger('common'));
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
app.use(session({
    secret: 'whatever',
    resave: false,
    saveUninitialized: true
})); // Depends on session
app.use(flash());

// Routes config
require('./config/routes')(app);

module.exports = app;