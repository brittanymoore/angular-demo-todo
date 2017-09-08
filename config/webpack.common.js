const webpack = require('webpack');
const path = require('path');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// constants
const APP_NAME = 'Todo App';

exports.API_URL = '';
exports.PUBLIC_PATH = '';

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
            { 
                test: /\.html$/, loader: 'raw-loader' 
            },
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
        })
        
    ],

    devServer: {
        historyApiFallback: true,
        port: 3000
    }

};