const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'app.bundle.js',
  },
  devServer: {
    contentBase: './docs',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
};
