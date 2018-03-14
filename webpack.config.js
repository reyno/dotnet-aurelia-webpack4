const path = require("path");
const webpack = require("webpack");
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { AureliaPlugin } = require("aurelia-webpack-plugin");

module.exports = (x, args ) => {

    const mode = args && args.mode;
    console.log("webpack", mode);

    return {
        entry: {
            app: 'aurelia-bootstrapper'
        },
        output: {
            path: path.resolve(__dirname, 'wwwroot/dist'),
            publicPath: "/dist/"
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [path.resolve(__dirname, "src"), 'node_modules']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/i,
                    loader: 'ts-loader'
                },
                {
                    test: /\.html$/i,
                    use: [{
                        loader: 'html-loader',
                        options: { minimize: true }
                    }]
                }
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        mode: "development",
        plugins: [
            new AureliaPlugin({
                aureliaApp: 'index'
            }),
            new HtmlWebPackPlugin({
                template: "./src/index.ejs",
                filename: "../index.html",
                metadata: { mode }
            })
        ]
    };

};