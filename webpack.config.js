const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './client/src',
  ],
  output: {
    path: path.join(__dirname, './client/public'),
    filename: 'bundle.js',
  },
  resolve: {
    modulesDirectories: ['node_modules', 'client/src'],
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=react,presets[]=es2015'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
};
