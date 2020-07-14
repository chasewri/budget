const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)