var models = require('../models');

module.exports = {
  getQuestions: function(req, res) {
    models.questions.getQuestionsRequest(req.query.product_id, req.params.page, req.params.count)
    .then((response) => {
     res.status(200).end(JSON.stringify(response.data.results));
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).end();
    })
  },

  postQuestion: function(req, res) {

    models.questions.postQuestionRequest({
      product_id: parseInt(req.body.product_id),
      name: req.body.name,
      email: req.body.email,
      body: req.body.body
    })
    .then((response) => {
     res.status(201).end();
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).end();
    })
  },

  postAnswer: function(req, res) {
    models.questions.postAnswerRequest({
        questionId: req.params.question_id,
        name: req.body.name,
        email: req.body.email,
        body: req.body.body,
        photos: req.body.photos,
      })
    .then((response) => {
      console.log(response);
     res.status(201).end();
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).end();
    })
  },

  putQuestionHelpful: function(req, res) {
    models.questions.putQuestionHelpfulRequest({
      questionId: req.params.question_id,
      helpfulness: req.body.helpfulness
    })
    .then((response) => {
     res.status(204).end();
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).end();
    })
  },

  putQuestionReport: function(req, res) {
    models.questions.putQuestionReportRequest({
      questionId: req.params.question_id,
      reported: req.body.reported
    })
    .then((response) => {
      console.log(response);
     res.status(204).end();
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).end();
    })
  },

  putAnswerHelpful: function(req, res) {
    models.questions.putAnswerHelpfulRequest({
      answerId: req.params.answer_id,
      helpfulness: req.body.helpfulness
    })
    .then((response) => {
      console.log(response);
     res.status(204).end();
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).end();
    })
  },

  putAnswerReport: function(req, res) {
    models.questions.putAnswerReportRequest({
      answerId: req.params.answer_id,
      reported: req.body.reported
    })
    .then((response) => {
     res.status(204).end();
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).end();
    })
  }
}