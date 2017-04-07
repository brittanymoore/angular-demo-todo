var webpack = require('webpack');
var path = require('path');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');

exports.apiUrl = ""; // can be used to prepend a static URL to web service calls
exports.config = {

    entry: {
        'main': './src/main.ts'
    },

    output: {
        publicPath: '',
        filename: '[name].bundle.js',
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
                test: /\.less$/, use: [ 
                    'exports-loader?module.exports.toString()',
                    'css-loader?sourceMap=false&importLoaders=1&minimize=true',
                    'less-loader?sourceMap=false'
                ]
            },            
            { 
                test: /\.css$/, use: [
                    'exports-loader?module.exports.toString()',
                    'css-loader?sourceMap=false&importLoaders=1&minimize=true',
                ] 
            },
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
            title: 'Todo',
            template: './config/index.template.ejs'
        })
    ],

    devServer: {
        historyApiFallback: true,
        port: 3000
    }

};