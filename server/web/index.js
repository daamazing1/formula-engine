'use strict';

const logger = require('winston');
const config = require('../config');
const app = require('./server');

var server = app.listen(config.server.port, function(){
  var port = server.address().port;
  logger.info(`App is listening on port ${port}`);
});
