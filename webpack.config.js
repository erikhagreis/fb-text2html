const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/umd.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fbtext2html.min.js',
    libraryTarget: 'umd',
    library: 'fbtext2html'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}