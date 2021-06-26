const axios = require("axios");
const questions = require("../controllers/questions");
const db = require("../db/database");

module.exports = {
  getQuestionsTableRequest: function (productId, page, count) {
    // let queryString = `SELECT * from questions WHERE product_id=${productId}`;
    let queryString = `SELECT questions.id, questions.body, questions.date_written, questions.asker_name, questions.helpful, questions.reported, answers.id, answers.body, answers.answerer_name, answers.helpful 
    from questions left join answers on answers.question_id = questions.id WHERE questions.product_id=${productId}`;

    return db.pool.query(queryString);
  },

  getAnswersTable: (productId, page, count) => {
    // let queryString = `SELECT * FROM answers WHERE question_id=${questionId} AND NOT reported=1`;
    let queryString = `SELECT questions.id, questions.body, questions.date_written, questions.asker_name, questions.helpful, questions.reported, answers.id, answers.body, answers.answerer_name,
    answers.helpful, images.url FROM questions left join answers on answers.question_id = questions.id left join images on 
    images.answer_id=answers.id WHERE questions.product_id=${productId} AND questions.reported=0 AND (answers.reported=0 OR answers.reported is null)`;

    return db.pool.query(queryString);
  },

  putQuestionsHelpful: (questionId) => {
    let queryString = `UPDATE questions SET helpful = helpful + 1 WHERE id=${questionId.questionId}`;
    return db.pool.query(queryString);
  },

  putQuestionsReport: (questionId) => {
    let queryString = `UPDATE questions SET reported = reported + 1 WHERE id=${questionId.questionId}`;
    return db.pool.query(queryString);
  },

  putAnswersHelpful: (id) => {
    let queryString = `UPDATE answers SET helpful = helpful + 1 WHERE id=${id.answer_id}`;
    return db.pool.query(queryString);
  },

  putAnswersReported: (answerId) => {
    let queryString = `UPDATE answers SET reported = reported + 1 WHERE id=${answerId.answerId}`;
    return db.pool.query(queryString);
  },

  postQuestionsTable: (product) => {
    let queryString = `INSERT INTO questions (id, product_id, asker_name, body, asker_email, helpful, reported)
    Values (nextVal('questions_id'), ${product.product_id}, '${product.name}', '${product.body}', '${product.email}', ${product.helpful}, ${product.reported}) `;
    return db.pool.query(queryString);
  },

  postAnswerTable: async (answer) => {
    try {
      let queryString = `INSERT INTO answers (id, question_id, answerer_name, body, answerer_email, helpful, reported)
    Values (nextVal('answers_id'), ${answer.questionId}, '${answer.name}', '${answer.body}', '${answer.email}', ${answer.helpful}, ${answer.reported})
    returning *`;
      const response = await db.pool.query(queryString);
      return response.rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createImages: async (image) => {
    try {
      let queryString = `INSERT INTO images (id, answer_id, url)
        Values (nextVal('images_id'), ${image.answer_id}, '${image.url}')
        returning *`;
      const response = await db.pool.query(queryString);
      return response.rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
