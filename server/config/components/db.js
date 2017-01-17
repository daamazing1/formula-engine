'use strict';

const joi = require('joi');
const envVarsSchema = joi.object({
  DATABASE_NAME: joi.string().required(),
  USER_NAME: joi.string().required(),
  PASSWORD: joi.string().required(),
  HOST_NAME: joi.string().required(),
  ENCRYPT: joi.boolean()
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
  db: {
    databaseName: envVars.DATABASE_NAME,
    userName: envVars.USER_NAME,
    password: envVars.PASSWORD,
    encrypt: envVars.ENCRYPT,
    hostName: envVars.HOST_NAME
  }
};

module.exports = config;
