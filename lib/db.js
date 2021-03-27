'use stric'

const { MongoClient } = require('mongodb')
const { DB_NAME } = process.env

let connection
async function connectDB() {
  if (connection) return connection
  let client
  try {
    client = await MongoClient.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    connection = client.db(DB_NAME)
  } catch (error) {
    console.error(`Could not connect to db ${process.env.CONNECTION_URL} ${error.message}`)
    process.exit(1)
  }
  return connection
}

module.exports = connectDB