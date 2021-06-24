const axios = require('axios');
const config = require('../.././config.js');

module.exports = {
  getProduct: function(id) {
    let options = {
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      }
    };
    return axios(options);
  },

  getStyles: function(id) {
    let options = {
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      }
    };
    return axios(options);
  }
}