const compiler = require('./webpack').compiler

require('../src/server/index')
compiler.watch({
  aggregateTimeout: 1000
}, (err, stats) => {
  console.log('Rebuilt')
})