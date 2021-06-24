const db = require('../../index')

module.exports - {
    getQuestionSql: ((err, cb) => {
        db.connection.query('SELECT * FROM questions WHERE product_id')
    }),


    create: ((err, cb) => {
        let queryString = `INSERT INTO questions (id, product_id, body, asker_name, asker_email)`
        db.connection.query(queryString)
    })
}