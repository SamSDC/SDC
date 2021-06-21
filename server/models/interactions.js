const axios = require('axios');
const config = require('../.././config.js');

module.exports = {
  create: function(form) {
    let options = {
      method: 'POST',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/interactions`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      },
      data: form
    };
    return axios(options);
  }
}