const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP_NAME = 'Todo App';

exports.config = {

    entry: {
        'main': './src/main.ts',
        'vendor': './src/vendor.ts',        
        'polyfill': './src/polyfill.ts'
    },

    output: {
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: [ '.ts', '.js' ],
        modules: [ path.resolve(__dirname, './../node_modules') ]
    },

    module: {
        rules: [
            { test: /\.html$/, loader: 'raw-loader' },
            {
                test: /\.(eot|svg)$/,
                use: 'file-loader?name=assets/[name].[hash:20].[ext]'
            },
            {
                test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
                use: 'url-loader?name=assets/[name].[hash:20].[ext]&limit=10000'
            }
        ]
    },

    plugins: [

        new HtmlWebpackPlugin({
            title: APP_NAME,
            template: './config/index.template.ejs',
            chunksSortMode: 'dependency'
        }),

        new ExtractTextPlugin('[name].css')
        
    ],

    devServer: {
        historyApiFallback: true,
        port: 3000
    },

    stats: {
        assets: true,
        children: false,
        errors: true,
        errorDetails: true,
        modules: false,
        warnings: false
    }

};