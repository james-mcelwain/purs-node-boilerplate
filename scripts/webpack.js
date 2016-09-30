const webpack = require('webpack')

const compiler = webpack({
  entry: [ './src/client/entry.js' ],
  output: {
    path: './dist',
    fileName: 'bundle.js',
  },
  cache: false,
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

module.exports = compileDist