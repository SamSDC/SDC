const {Pool, Client} = require('pg');


/*

const client = new Client(connectionString)
client.connect((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
})

*/
const pool = new Pool()

pool.connect()
  .then(client => {
    return client
      .query('select * from questions limit 1;')
      .then(console.log)
      .finally(() => client.release());
  })
  .catch(console.error);

  const newClient = () => {
    return pool.connect();
  }


module.exports.pool = pool;