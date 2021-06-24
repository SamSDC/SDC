var models = require("../models");

module.exports = {
  get: function (req, res) {
    models.reviews
      .getReviews(
        req.params.product_id,
        req.params.page,
        req.params.count,
        req.params.sort
      )
      .then((response) => {
        res.status(200).end(JSON.stringify(response.data.results));
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },

  getMeta: function (req, res) {
    models.reviews
      .getOverview(req.params.product_id)
      .then((response) => {
        res.status(200).end(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },

  markHelpful: function (req, res) {
    models.reviews
      .markHelpful(req.params.review_id)
      .then(res.status(201).end())
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },

  submitForm: function (req, res) {
    models.reviews
      .submitForm({
        product_id: parseInt(req.body.product_id),
        rating: req.body.rating,
        summary: req.body.summary,
        body: req.body.body,
        recommend: req.body.recommend,
        name: req.body.name,
        email: req.body.email,
        photos: req.body.photos,
        characteristics: req.body.characteristics,
      })
      .then((response) => {
        res.status(201).end();
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },

  report: function (req, res) {
    models.reviews
      .report(req.params.review_id)
      .then(res.status(201).end())
      .catch((err) => {
        console.log("err", err);
        res.status(400).end();
      });
  },
};
