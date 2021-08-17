const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env={}, argv) => {
    const { analyzeBundle } = env;

    return {
        resolve: {
            extensions: ['.js', '.json', '.jsx'],
            modules: [path.resolve(__dirname, "src"), "node_modules"],
            alias: {
              src: path.resolve(__dirname, "src/"),
              component: path.resolve(__dirname, "src/component/"),
              store: path.resolve(__dirname, "src/store/"),
            },
        },
        devServer: { contentBase: path.join(__dirname, "src") }, // https://webpack.js.org/guides/hot-module-replacement/
        module: {
            rules: [
                {
                  test: /\.(js|jsx)$/,
                  exclude: /node_modules/,
                  use: ["babel-loader"],
                },
                {
                  test: /\.(css|scss)$/,
                  use: ["style-loader", "css-loader", "sass-loader"],
                },
                {
                  test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                  use: ["file-loader"],
                },
              ],
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: path.join(__dirname, './build/vendor'),
                manifest: path.resolve(__dirname, './build/vendor/vendor-manifest.json')
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: analyzeBundle? "static" : "disabled",
              }),
        ],
        optimization: {
            minimize: true,
            minimizer: [
              new TerserPlugin({
                extractComments: false,
              }),
              //https://webpack.js.org/plugins/terser-webpack-plugin/
            ]
          },
    };
}