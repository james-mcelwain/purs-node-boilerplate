/* eslint-disblae no-console */
const chalk = require('chalk')
const compileDist = require('./webpack')

void function Main() {
  let [_, __, flag] = process.argv // eslint-disable no-unused-vars
  compileDist((err, stats) => {
    if (err) {
      console.log(err)
    }

    if (flag === '-d' || flag === '--debug') {
      console.log(chalk.blue(chalk.bold('Webpack Stats:\n')))
      console.log(stats)

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
    }
  })
}()