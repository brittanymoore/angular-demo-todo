const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';
const API_URL = process.env.API_URL = '';
const PUBLIC_PATH = '';

const OUTPUT_PATH = path.resolve(__dirname, './../dev');
const SOURCE_PATH = path.resolve(__dirname, './../src');

module.exports = webpackMerge(common.config, {

    output: {
        filename: '[name].bundle.js',        
        publicPath: PUBLIC_PATH,
        path: OUTPUT_PATH,
        pathinfo: true // devtool: eval
    },

    devtool: 'eval', 

    module: {
        rules: [
            { 
                test: /\.ts$/, 
                use: [ { loader: 'awesome-typescript-loader', options: { silent: true }},  'angular2-template-loader',  'angular-router-loader' ],
                exclude: /node_modules/
            },
            { test: /\.scss$/, use: [ 'exports-loader?module.exports.toString()', 'css-loader', 'sass-loader' ], exclude: [ /node_modules/, /src\\global.css/ ] },
            { test: /\.css$/, use: [ 'exports-loader?module.exports.toString()', 'css-loader' ], exclude: [ /node_modules/, /src\\global.css/ ] },
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [
                    'css-loader?sourceMap=false&importLoaders=1&minimize=true',
                ]}), 
                include: [ /node_modules/, /src\\global.css/ ]
            }
        ]
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'API_URL': JSON.stringify(API_URL)
            }
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            SOURCE_PATH,
            {}
        )

    ],

    devServer: {
        contentBase: OUTPUT_PATH
    }

});
