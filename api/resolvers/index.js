const authResolver = require('./auth')
const categoryResolver = require('./categories')
const transactionResolver = require('./transactions')


const rootResolver = {
    ...authResolver,
    ...categoryResolver,
    ...transactionResolver

}

module.exports = rootResolver