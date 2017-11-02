const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common');
const OUTPUT_PATH = path.resolve(__dirname, `./../${process.env.OUTPUT_DIR}`);
const SOURCE_PATH = path.resolve(__dirname, `./../${process.env.SOURCE_DIR}`);

module.exports = webpackMerge(common.config, {

    output: {
        filename: '[name].bundle.js',        
        publicPath: process.env.PUBLIC_PATH,
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

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            SOURCE_PATH,
            {}
        )

    ]

});
