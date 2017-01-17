'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

let db = {};

const sequelize = new Sequelize(
  config.db.databaseName,
  config.db.userName,
  config.db.password,
  {
    dialect: 'mssql',
    host: config.db.hostName,
    dialectOptions: {
      encrypt: config.db.encrypt
    }
  });

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
})
  .forEach(function (file) {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
