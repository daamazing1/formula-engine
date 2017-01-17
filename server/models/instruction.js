'use strict';

module.exports = function(sequelize, DataTypes){
  let Instruction = sequelize.define('Instruction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    expression: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models){
        Instruction.belongsTo(models.Formula);
      }
    }
  });
  return Instruction;
};
