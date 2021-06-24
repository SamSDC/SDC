const controller = require('./controllers');
var router = require('express').Router();

router.get('/products/:product_id', controller.products.get);

router.get('/qa/questions', controller.questions.getQuestions);

router.post('/qa/questions', controller.questions.postQuestion);

router.post('/qa/questions/:question_id/answers', controller.questions.postAnswer);

router.put('/qa/questions/:question_id/helpful', controller.questions.putQuestionHelpful);

router.put('/qa/questions/:question_id/report', controller.questions.putQuestionReport);

router.put('/qa/answers/:answer_id/helpful', controller.questions.putAnswerHelpful);

router.put('/qa/answers/:answer_id/report', controller.questions.putAnswerReport);

router.get('/reviews/:product_id/:page/:count/:sort', controller.reviews.get);

router.get('/reviews/meta/:product_id', controller.reviews.getMeta);

router.put('/reviews/:review_id/helpful', controller.reviews.markHelpful);

router.get('/products/:product_id/styles', controller.products.getImgs);

router.post('/reviews', controller.reviews.submitForm);

router.post('/interactions', controller.interactions.create);

router.put('/reviews/:review_id/report', controller.reviews.report);

module.exports = router;