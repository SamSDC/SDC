const fs = require('fs')
const config = require('./config.js');
const express = require('express');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const router = require('./server/routes.js');
const port = 3246;
const path = require('path');
const {Pool, Client} = require('pg')
const copyFrom = require('pg-copy-streams').from
const papa = require('papaparse')

let app = express();

const connectionString = 'postgres://postgres:postgres@localhost:5432/postgres'

const client = new Client(connectionString)
client.connect((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
})

// const pool = new Pool({
//   connectionString
// });

// pool.connect((err, c, done) => {
//   // console.log(client.database);
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('pool bound');
//   }



// const stream = client.query(
//   copyFrom(
//     "COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM STDIN WITH (FORMAT csv)"
//   )
// )

// const fileStream = fs.createReadStream('./csv-files/questions.csv');
// fileStream.on("error", done)
// stream.on('error', done)
// stream.on('finish', done)
// fileStream.pipe(stream)
// })






cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET
})

app.use(express.static(__dirname + "/client/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse())

app.use('/api', router);

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/client/dist/index.html', function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.post('/api/reviews/image-upload', (req, res) => {
  var file = (req.files['0']);
  cloudinary.uploader.upload(file.path)
  .then((response) => {
     res.status(201).end(JSON.stringify(response));
    })
    .catch(err => {
      console.log('err', err);
      res.status(400).end();
    })
})

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

