const path = require('path')
const webpack = require('webpack')

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
  const [_, __, flag] = process.argv
  compileDist((err, stats) => {
    if (err) {
      console.log(err)
    }

    if (flag === '-d' || flag === '--debug') {
      console.log(stats)
      console.log(stats.compilation.errors ? stats.compilation.errors : '\n')
    }
  })
}()

module.exports = compileDist