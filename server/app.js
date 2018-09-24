'use strict'

require('dotenv').config()
const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'test') {
  var url = process.env.DB_MONGO_TEST
} else {
  var url = process.env.DB_MONGO_MLAB
}

mongoose.connect(url)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB is connected')
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', router)    

app.listen(3000, () => {
    console.log("App server is running on port 3000")
})


module.exports = app