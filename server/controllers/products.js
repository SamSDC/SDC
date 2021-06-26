var { getProduct, getStyles, getRelated } = require('../models').products;

const handleQuery = (req, res, dataModel) => {
  const { product_id } = req.params;
    if (product_id === undefined) {
      res.status(500).end('Unable to parse {product_id} property from req.params');
    } else {
      dataModel(product_id)
        .then(model => {
          const [client, query] = model;
          query.then((psqlResponse) => {
            res.status(200).end(JSON.stringify(psqlResponse.rows));
          })
          .finally(() => {
            client.release();
          })
        })
        .catch(err => {
          console.error('Error fetching product: ' + product_id);
          console.error(err);
        })
      }
};

module.exports = {
  get: function(req, res) {
    handleQuery(req, res, getProduct);
  },

  getStyles: function(req, res) {
    handleQuery(req, res, getStyles);
  },

  getRelated: (req, res) => {
    handleQuery(req, res, getRelated);
  }
}