'use strict';

const models = require.main.require('./models');

module.exports = {
  all: (req, res) => {
    models.Formula.findAll({
      include: [{model: models.Instruction, as: 'instructions'}]
    })
    .then(function(formulas){
      res.status(200).json(formulas);
    });
  }
};
