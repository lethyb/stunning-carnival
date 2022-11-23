const path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.css?$/,
                use: 'css-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
                exclude: /(node_modules)/
            },
            {
                test: /\.pdf$/,
                type: 'asset/inline'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.(mp3)$/i,
                type: 'asset',
            },
            {
                test: /\.worker\.js$/,
                use: 'worker-loader'
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            react: path.resolve('./node_modules/react')
        },
    },
};