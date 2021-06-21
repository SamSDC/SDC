var models = require('../models');

module.exports = {
  get: function(req, res) {
    models.products.getProduct(req.params.product_id)
    .then((response) => {
     res.status(200).end(JSON.stringify(response.data));
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).end();
    })
  },

  getImgs: function(req, res) {
    models.products.getStyles(req.params.product_id)
    .then((response) => {
     res.status(200).end(JSON.stringify(response.data));
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).end();
    })
  }
}