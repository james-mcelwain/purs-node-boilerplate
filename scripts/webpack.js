const path = require('path')
const webpack = require('webpack')

const compiler = webpack({
  entry: [path.resolve(__dirname, '..', 'src/psc/main.purs')],
  output: {
    path: path.join(__dirname, '..', '/dist'),
    fileName: 'bundle.js',
  },
  resolve: {
    extenions: ['.js', '.purs'],
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.purs$/,
        loader: 'purs-loader',
        exclude:[/node_modules/],
        query: {
            psc: 'psa',
            src: ['bower_components/purescript-*/src/**/*.purs', 'src/**/*.purs'],
        }
      }
    ],
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({ minimize: true })],
})

module.exports = function compileDist(cb) {
  compiler.run((err, stats) => {
    if (err) {
      console.log(err)
      cb(err)
    }
    cb(null, stats)
  })
}
