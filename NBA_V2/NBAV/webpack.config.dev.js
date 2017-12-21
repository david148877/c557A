"use strict";
//init
const webpack = require("webpack");

//Lint and test
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

//File ops
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

//Folder ops
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

//Constants
const SRC = path.join(__dirname,'src');
const BUILD = path.join(__dirname,'dist');
const TEMPLATES = path.join(__dirname,'src/templates');
const PUBLIC = path.join(__dirname,'src/public');
//const LINT = path.join(__dirname, '.eslintrc');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const PROXY = `http://${HOST}:${PORT}`;

module.exports={
    // Source maps used for debugging information
    devtool:'source-map',
    // webpack-dev-server configuration
    devServer:{
        contentBase:'./dist',
        historyApiFallback:true,
        hot:true,
        inline:true,
        stats:'errors-only',
        host:HOST,
        port:PORT,
        watchOptions: {
            poll: true
        }
    },
    entry: {
        main:SRC+"/script/index.js",
        common:['d3']
    },
    output:{
        path:BUILD,
        publicPath: 'http://localhost:8080',
        filename:'js/[name].js'
    },
    resolve:{
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
    /*eslint:{
     configFile: LINT,
     emitError: true
     },*/
    module:{

        noParse: /node_modules\/json-schema\/lib\/validate\.js/,
        loaders:[
            {
                test:/\.(js|es6)$/,
                exclude: /(node_modules)/,
                loader:["babel-loader"]//, 'eslint-loader'
            },
            {
                test: /\.css$/,
                use:ExtractTextWebpackPlugin.extract({
                    use:"css-loader"
                })
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') // eslint-disable-line quote-props
            }
        }),
        new ExtractTextWebpackPlugin('css/style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            names:["common",
                "manifest"]
        }),
        new CopyWebpackPlugin([
                { from: PUBLIC, to: BUILD }
            ]
        ),
        new HtmlWebpackPlugin({
            title:"MapV",
            template: TEMPLATES+"/index.html",
            filename: "index.html",
            inject: true,
            hash:false
            //chunks:['main',"common","manifest"]
        }),
        new webpack.BannerPlugin('This file is created by gissky')
    ]
};