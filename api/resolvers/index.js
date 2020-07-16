const authResolver = require('./auth')
const categoryResolver = require('./categories')


const rootResolver = {
    ...authResolver,
    ...categoryResolver
}

module.exports = rootResolver