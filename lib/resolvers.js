const connectDb = require('../database/connection')
const mutations = require('./mutations')
const queries = require('./queries')
const types = require('./types')

  // connect to mongodb
  ; (async function () {
    await connectDb()
  })()

module.exports = {
  Query: queries,
  Mutation: mutations,
  ...types
}
