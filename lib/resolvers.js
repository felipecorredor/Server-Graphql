const connectDb = require('../database/connection')
const mutations = require('./mutations')
const queries = require('./queries')

  // connect to mongodb
  ; (async function () {
    await connectDb()
  })()

module.exports = {
  Query: queries,
  Mutation: mutations
}
