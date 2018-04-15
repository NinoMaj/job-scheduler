const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  externals: [webpackNodeExternals()],

  plugins: [
    new webpack.DefinePlugin({
      MONGODB_URI: JSON.stringify(process.env.MONGODB_URI),
      SLACK_TOKEN: JSON.stringify(process.env.SLACK_TOKEN),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

module.exports = merge(baseConfig, config);
