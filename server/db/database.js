const {Pool, Client} = require('pg');

const pool = new Pool()

pool.connect()
  .then(client => {
    return client
      .query(`SELECT * FROM answers where question_id = 2`)
      // .then(console.log)
      .finally(() => client.release());
  })
  .catch(console.error);

  const newClient = () => {
    return pool.connect();
  }


module.exports = {
    pool,
    newClient
};