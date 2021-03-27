const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.set('useFindAndModify', false)
}

module.exports = connectDB