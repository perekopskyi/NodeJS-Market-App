if (process.env.NODE_ENV === 'production') {
  console.log('production mode')
  module.exports = require('./keys.prod')
} else {
  console.log('development mode')
  module.exports = require('./keys.dev')
}
