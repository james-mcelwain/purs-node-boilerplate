/* eslint-disblae no-console */
const webpack = require('webpack')
const chalk = require('chalk')

const compiler = webpack({
  entry: [ './src/client/entry.js' ],
  output: {
    path: './dist',
    fileName: 'bundle.js',
  },
  resolve: {
    modulesDirectories: [ 'node_modules', 'bower_components' ],
    extensions: ['', '.purs', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.purs$/,
        loader: 'purs-loader',
        query: {
            psc: 'psa',
            pscIde: true,
            src: [ 'bower_components/purescript-*/src/**/*.purs', 
                   'src/client/*.purs' ],
        },
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [/node_modules/, /bower_components/]
      }
    ],
  },
  // plugins: [new webpack.optimize.UglifyJsPlugin({ minimize: true })],
})

function compileDist(cb) {
  compiler.run((err, stats) => {
    if (err) {
      console.log(err)
      cb(err)
    }
    cb(null, stats)
  })
}


void function Main() {
  const [_, __, flag] = process.argv // eslint-disable no-unused-vars
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

module.exports = compileDist