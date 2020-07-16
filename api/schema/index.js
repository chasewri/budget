const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type Transaction {
        _id: ID!
        name: String!
        description: String
        amount: Float!
        date: String!
        category: Category!
        user: User!
    }

    input TransactionInput {
        name: String!
        description: String
        amount: Float!
        date: String!
    }

    type Category {
        _id: ID!
        name: String!
        user: User!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input CategoryInput {
        name: String!
        id: String!
    }

    type RootQuery {
        categories(userId: String!): [Category!]!
        transactions: [Transaction!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createCategory(categoryInput: CategoryInput): Category
        createTransaction(transactionInput: TransactionInput): Transaction!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)