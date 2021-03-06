const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './client/src',
  ],
  output: {
    path: path.join(__dirname, './client/public'),
    filename: 'bundle.js',
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: {
          host: 'localhost',
          port: 3000,
          "protocol": 'http:',
        },
        changeOrigin: true,
        secure: false,
      },
    },
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
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
