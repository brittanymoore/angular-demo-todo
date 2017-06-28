const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const WebpackChunkHash = require('webpack-chunk-hash');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

// plugins
const ngtools = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// common config
const common = require('./webpack.common');

// constants
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const API_URL = process.env.API_URL = common.apiUrl;
const USE_MOCK = process.env.USE_MOCK = false;

const nodeModules = path.join(process.cwd(), './../node_modules');

module.exports = webpackMerge(common.config, {

    output: {
        publicPath: common.PUBLIC_PATH,
        path: path.resolve(__dirname, './../dist')
    },

    devtool: 'source-map',

    module: {
        rules: [
            { test: /\.ts$/, loader: '@ngtools/webpack' }        
        ]
    },

    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main', 'vendor'],
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }            
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        // the plugins below are currently causing an error with the start command - 
        // commenting until I can figure that out
        /*
        new ChunkManifestPlugin({
            filename: 'manifest.json',
            manifestVariable: 'webpackManifest',
            inlineManifest: false
        }),
        */

        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig.aot.json',
            mainPath: './src/main.ts'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'API_URL': JSON.stringify(API_URL),
                'USE_MOCK': JSON.stringify(USE_MOCK)
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
    ]

});
