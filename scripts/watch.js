const watch = require('node-watch')
const chalk = require('chalk')
const rimraf = require('rimraf')
const path = require('path')

const build = require('./webpack')

let count = 0

const runBuild = () => {
  return new Promise((resolve, reject) => {
    build((err, stats) => {
      count ++ 
      console.log(count)

      if (err) {
        reject(err)
        console.log(err)
      }

      if (stats.compilation.errors.length > 0) {
        console.log('\n\n')
        console.log(chalk.red(chalk.bold('Errors:\n')))
        stats.compilation.errors.filter(x => x).forEach(error=> {
          if (typeof error === 'string') {
            console.log(error)
          } else if (typeof error === 'object') {
            // PASS
          }
        })
      }

      resolve()
    })
  })
}

function WATCH() {
  runBuild().then(() => {
    watch('./src', { recrusive: true }, (file) => {
      if (/\.purs/.test(file)) {
        rimraf(path.resolve(__dirname, '..', 'dist/bundle.js'), (err) => {
          if (err) {
            console.log(err)
            process.exit(1)
          }
          
          runBuild().then(() => console.log('Rebuilt'))
        })
      }
    })
  })
}    

require('../src/server/index')
WATCH()
