require('dotenv').config()
require('newrelic');
const config = require('./config.js');
const express = require('express');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const router = require('./server/routes.js');
const db = require('./server/db/database.js');

db.init();

let app = express();

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

app.listen(3246, function () {
  console.log(`listening on port 3246`);
});

module.exports = app;
