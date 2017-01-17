'use strict';

module.exports = function (sequelize, DataTypes){
  let Formula = sequelize.define('Formula', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
    }, {
      classMethods: {
        associate: function(models){
          Formula.hasMany(models.Instruction, { as: 'instructions' });
      }
    }
  });
  return Formula;
};
