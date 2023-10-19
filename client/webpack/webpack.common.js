const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')
dotenv.config()

const alias = require('./parts/alias')
const rules = require('./parts/rules')

module.exports = {
    entry: path.resolve(__dirname, '..', './src/app/index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: alias
    },
    module: {
        rules: rules
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, '..', './build'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './src/app/index.html')
        }),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ]
}