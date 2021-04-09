const { makeExecutableSchema } = require('graphql-tools')
var { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const express = require('express')
const resolvers = require('./lib/resolvers')
const cors = require('cors')

// initialize express
const app = express()
const port = process.env.port || 5000
const isDev = process.env.NODE_ENV !== 'production'

// definiendo el schema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

app.use(cors())
// execute query
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev,
  })
)

app.listen(port, () => {
  console.log(`Server listen at http://localhost:${port}/graphql`)
})
