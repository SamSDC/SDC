// const axios = require('axios');
const { newClient } = require('../db/database.js');
const config = require('../.././config.js');

module.exports = {
  getProduct: function(id) {
    return newClient().then(client => {
      return [client, client.query(`select p.*, f.features from products as p left join features_optimized as f on (p.id = f.id) where p.id = ${id};`)];
    });
  },

  getStyles: function(id) {
    return newClient().then(client => {
      return [client, client.query(`select styles.*, skus_optimized.skus, photos_optimized.photos from styles left join skus_optimized on styles.style_id = skus_optimized.style_id left join photos_optimized on photos_optimized.style_id = styles.style_id where styles.product_id = ${id};`)];
    });
  },

  getRelated: (id) => {
    return newClient().then(client => {
      return [
        client,
        client
          .query(`select * from (select related_ids from related_optimized where related_optimized.current_product_id = ${id}) as pre;`)
          .then(res => ({rows: res.rows[0]['related_ids'] ?? []}))
      ];
    });
  }

}