const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config.base.js');

config.mode = 'development';
config.devtool = 'eval';
config.devServer = {
    host: '0.0.0.0',
    compress: true,
    port: 8181,
    historyApiFallback: true,
    hot: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
};
config.plugins = [
    new webpack.EnvironmentPlugin({
        NODE_ENV: config.mode,
        DEBUG: true,
    }),
]

module.exports = config;