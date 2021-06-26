var models = require("../models");

module.exports = {
  getQuestionTable: function (req, res) {
    models.questionsTable
      .getQuestionsTableRequest(req.query.product_id)
      .then((response) => {
        res.status(200).end(JSON.stringify(response.rows));
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },

  getAnswerTable: function (req, res) {
    models.questionsTable
      .getAnswersTable(req.params.question_id)
      .then((response) => {
        console.log(response);
        res.status(200).end(JSON.stringify(response.rows));
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },

  postQuestionTable: function (req, res) {
    models.questionsTable
      .postQuestionsTable({
        product_id: parseInt(req.query.product_id),
        name: req.body.name,
        email: req.body.email,
        body: req.body.body,
        helpful: req.body.helpful,
        reported: req.body.reported,
      })
      .then((response) => {
        res.status(201).end();
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },

  postAnswerTable: async function (req, res) {
    try {
      const answer = await models.questionsTable.postAnswerTable({
        questionId: req.params.question_id,
        name: req.body.name,
        email: req.body.email,
        body: req.body.body,
        helpful: req.body.helpful,
        reported: req.body.reported,
      });
      let images;
      if (req.body.images) {
        images = await Promise.all(
          req.body.images.map((img) => {
            return models.questionsTable.createImages({
              url: img.url,
              answer_id: answer.id,
            });
          })
        );
      }
      res.status(201);
      res.send({
        ...answer,
        images,
      });
    } catch (err) {
      console.log("err", err);
      res.send(err);
      res.status(400).end();
    }
  },

  putQuestionHelpful: function (req, res) {
    models.questionsTable
      .putQuestionsHelpful({
        questionId: req.params.question_id,
      })
      .then((response) => {
        res.status(204).end();
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },

  putQuestionReport: function (req, res) {
    models.questionsTable
      .putQuestionsReport({
        questionId: req.params.question_id,
      })
      .then((response) => {
        res.status(204).end();
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },

  putAnswerHelpful: function (req, res) {
    models.questionsTable
      .putAnswersHelpful({
        answer_id: req.params.answer_id,
      })
      .then((response) => {
        console.log(response);
        res.status(204).end();
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },

  putAnswerReport: function (req, res) {
    models.questionsTable
      .putAnswersReported({
        answerId: req.params.answer_id,
      })
      .then((response) => {
        res.status(204).end();
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },
};
