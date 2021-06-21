const axios = require("axios");
const config = require("../.././config.js");

module.exports = {
  getReviews: function (id, page, count, sort) {

    let options = {
      method: "GET",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=${id}&count=${count}&page=${page}&sort=${sort}`,
      headers: {
        "User-Agent": "request",
        Authorization: `${config.TOKEN}`,
      },
    };
    return axios(options);
  },

  getOverview: function (id) {
    let options = {
      method: "GET",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=${id}`,
      headers: {
        "User-Agent": "request",
        Authorization: `${config.TOKEN}`,
      },
    };
    return axios(options);
  },

  markHelpful: function (id) {
    let options = {
      method: "PUT",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`,
      headers: {
        "User-Agent": "request",
        Authorization: `${config.TOKEN}`,
      },
    };
    return axios(options);
  },

  submitForm: function (form) {
    let options = {
      method: "POST",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`,
      headers: {
        "User-Agent": "request",
        Authorization: `${config.TOKEN}`,
      },
      data: form
    };
    return axios(options);
  },

  report: function (id) {
    let options = {
      method: "PUT",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/report`,
      headers: {
        "User-Agent": "request",
        Authorization: `${config.TOKEN}`,
      },
    };
    return axios(options);
  },
};
