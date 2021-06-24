var models = require('../models');

module.exports = {
  create: function(req, res) {
    models.interactions.create({
      element: req.body.element,
      widget: req.body.widget,
      time: req.body.time,
    })
    .then((response) => {
     res.status(201).end();
    })
    .catch(err => {
      console.log('err', err);
      res.status(422).end();
    })
  }
}