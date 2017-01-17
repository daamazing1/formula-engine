'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const winston = require('winston');
const morgan = require('morgan');

let app = express();
// HTTP request logger middleware for node.js
app.use(morgan('combined', {'stream': {
    write: function(message){
        winston.info(message);
    }
}}));
app.use('/', router);
app.use(bodyParser.json());

module.exports = app;
