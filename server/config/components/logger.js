'use strict';

const joi = require('joi');
const winston = require('winston');

const envVarsSchema = joi.object({
  LOGGER_LEVEL: joi.string()
    .allow(['error', 'warn', 'info', 'verbose', 'debug'])
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if(error){
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED
  }
};

winston.level = config.logger.level;
winston.emitErrs = true;
winston.add(winston.transports.File, {
  filename: './logs/all-logs.log',
  handleExceptions: true,
  json: true,
  maxsize: 5242880,
  maxFiles: 5,
  colorize:false
});

if(!config.logger.enabled){
  winston.remove(winston.transports.File);
}

module.exports = config;
