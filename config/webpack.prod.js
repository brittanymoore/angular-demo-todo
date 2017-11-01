const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');

const ngtools = require('@ngtools/webpack');
const WebpackChunkHash = require('webpack-chunk-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const API_URL = process.env.API_URL = '';
const PUBLIC_PATH = '';

const OUTPUT_PATH = path.resolve(__dirname, './../dist');
const SOURCE_PATH = path.resolve(__dirname, './../src');

module.exports = webpackMerge(common.config, {

    output: {
        filename: '[name].[chunkhash].js',        
        publicPath: PUBLIC_PATH,
        path: OUTPUT_PATH
    },

    module: {
        rules: [
            { test: /\.ts$/, loader: '@ngtools/webpack', exclude: /node_modules/ },
            { 
                test: /\.scss$/,
                use: [
                    'exports-loader?module.exports.toString()',
                    'css-loader?sourceMap=false&importLoaders=1&minimize=true',
                    'sass-loader',
                    { loader: 'postcss-loader', options: { config: { path: './config/postcss.config.js' }}}    
                ],
                exclude: [ /node_modules/, /src\\global.css/ ]
            },
            { 
                test: /\.css$/, use: [
                    'exports-loader?module.exports.toString()',
                    'css-loader?sourceMap=false&importLoaders=1&minimize=true',
                    { loader: 'postcss-loader', options: { config: { path: './config/postcss.config.js' }}}
                ],
                exclude: [ /node_modules/, /src\\global.css/ ]
            },
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [
                    'css-loader?sourceMap=false&importLoaders=1&minimize=true',
                    { loader: 'postcss-loader', options: { config: { path: './config/postcss.config.js' }}}
                ]}), 
                include: [ /node_modules/, /src\\global.css/ ]
            } 
        ]
    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }            
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),

        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig.aot.json',
            mainPath: './src/main.ts'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'API_URL': JSON.stringify(API_URL)
            }
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            sourceMap: true,
            compress: {
                screw_ie8: true,
                warnings: false
            },            
            comments: false
        })

    ],

    devServer: {
        contentBase: OUTPUT_PATH,
        historyApiFallback: {
            index: PUBLIC_PATH
        }
    }

});
