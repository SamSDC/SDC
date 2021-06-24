const axios = require('axios');
const config = require('../.././config.js');

module.exports = {
  getQuestionsRequest: function(productId, page, count) {
    let options = {
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productId}&page=${1}&count=${100}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      }
    };
    return axios(options);
  },

  postQuestionRequest: function({ product_id, name, body, email }) {
    let options = {
      method: 'POST',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${product_id}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      },
      data: {
        product_id,
        name,
        email,
        body,
      }
    };
    return axios(options);
  },

  postAnswerRequest: function({ questionId, name, body, email, photos }) {
    let options = {
      method: 'POST',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      },
      data: {
        name,
        email,
        body,
        photos
      }
    };
    return axios(options);
  },

  putQuestionHelpfulRequest: function({ questionId, helpfulness }) {
    let options = {
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/helpful`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      },
      data: {
        helpfulness
      }
    };
    return axios(options);
  },

  putQuestionReportRequest: function({ questionId, reported }) {
    let options = {
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/report`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      },
      data: {
        reported
      }
    };
    return axios(options);
  },

  putAnswerHelpfulRequest: function({ answerId, helpfulness }) {
    let options = {
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerId}/helpful`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      },
      data: {
        helpfulness
      }
    };
    return axios(options);
  },

  putAnswerReportRequest: function({ answerId, reported }) {
    let options = {
      method: 'PUT',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerId}/report`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `${config.TOKEN}`
      },
      data: {
        reported
      }
    };
    return axios(options);
  }
}





