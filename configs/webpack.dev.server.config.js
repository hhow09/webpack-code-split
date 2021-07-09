const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const paths = require("./paths");
const { WatchIgnorePlugin, DefinePlugin, ProvidePlugin } = require("webpack");
const StartServerPlugin = require("start-server-nestjs-webpack-plugin"); //polyfill webpack 5
//const StartServerPlugin = require('start-server-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const config = require("./");

module.exports = {
  entry: { server: [paths.appServerIndexJs] },
  output: {
    path: paths.appBuild,
    publicPath: config.clientPublicPath,
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    libraryTarget: "commonjs2",
  },
  target: "node", // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  resolveLoader: {
    modules: ["node_modules"],
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      "webpack/hot/poll": require.resolve("webpack/hot/poll"),
    },
    fallback: {
      fs: false,
      buffer: require.resolve("buffer/"),
      stream: false,
      http: false,
      crypto: false,
      zlib: false,
      net: false,
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
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WatchIgnorePlugin({ paths: [paths.appAssetsManifest] }),
    // new DefinePlugin(),
    new ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new StartServerPlugin({
      name: "server.js",
      entryName: "server",
      nodeArgs: ["--inspect"], // allow debugging
      args: ["scriptArgument1", "scriptArgument2"], // pass args to script
      signal: false | true | "SIGUSR2", // signal to send for HMR (defaults to `false`, uses 'SIGUSR2' if `true`)
      keyboard: true | false, // Allow typing 'rs' to restart the server. default: only if NODE_ENV is 'development'
      restartable: true,
      inject: true,
      killOnExit: false,
      killOnError: false,
      killTimeout: 1000,
    }),
  ],
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      // https://webpack.js.org/plugins/terser-webpack-plugin/
    ],
    splitChunks: config.splitChunksConfigs.dev,
  },
  watch: true,
  watchOptions: {
    ignored: "**/node_modules",
    poll: 1000,
    aggregateTimeout: 3000,
  },
};
