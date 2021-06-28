const {Pool, Client} = require('pg');

const {PGHOST, PGDATABASE, PGPORT} = process.env;

if (!(PGHOST && PGDATABASE && PGPORT)) {
  throw new Error('Environmental variables not set for {PGHOST, PGDATABASE, PGPORT, PGUSER, PGPASSWORD}. Please configure in .env file and be sure these variables load BEFORE the database is instantiated.');
}

console.info(`Attempting connection to database '${PGDATABASE}' on ${PGHOST}:${PGPORT}`);

const pool = new Pool()

console.info('Creating database pool.');

const newClient = () => {
  return pool.connect();
}

const init = async () => {
  await newClient()
  .then(client => {
    return client.query('select now();')
      .then((res) => console.info(`Successfully connected to database '${PGDATABASE}' using pool.`))
      .finally(() => client.release());
  })
  .catch(console.error);
}

// init();

module.exports.pool = pool;
module.exports.newClient = newClient;
module.exports.init = init;