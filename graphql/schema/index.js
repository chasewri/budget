const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)