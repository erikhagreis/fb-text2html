const path = require('path');

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
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  },
  mode: 'production',
}