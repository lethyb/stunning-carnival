const webpack = require('webpack');
const config = require('./webpack.config.base.js');

config.mode = 'production';
config.plugins = [
    new webpack.EnvironmentPlugin({
        NODE_ENV: config.mode,
        DEBUG: false,
    }),
]

module.exports = config;