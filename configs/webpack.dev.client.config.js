const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const paths = require("./paths");
const {
  WatchIgnorePlugin,
  DefinePlugin,
  ProvidePlugin,
  HotModuleReplacementPlugin,
} = require("webpack");
const StartServerPlugin = require("start-server-nestjs-webpack-plugin"); //polyfill webpack 5
//const StartServerPlugin = require('start-server-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const webpackDevClientEntry = require.resolve("razzle-dev-utils/webpackHotDevClient");
const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");

const config = require("./");

const splitChunksConfigs = {
  dev: {
    cacheGroups: {
      default: false,
      vendors: false,
      // In webpack 5 vendors was renamed to defaultVendors
      defaultVendors: false,
    },
  },
  prod: {
    cacheGroups: {
      default: false,
      vendors: false,
      // In webpack 5 vendors was renamed to defaultVendors
      defaultVendors: false,
    },
  },
};

module.exports = {
  entry: { client: [paths.appClientIndexJs, webpackDevClientEntry] },
  target: "web",
  mode: "development",
  output: {
    path: paths.appBuildPublic,
    publicPath: config.clientPublicPath,
    pathinfo: true,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
  },
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
  devServer: {
    disableHostCheck: true,
    clientLogLevel: "none", // Enable gzip compression of generated files.
    compress: true, // watchContentBase: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
    },
    host: config.devHost,
    publicPath: config.clientPublicPath,
    hot: true,
    noInfo: true,
    overlay: false,
    port: config.devServerPort,
    quiet: true, // By default files from `contentBase` will not trigger a page reload.
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: { ignored: /node_modules/ },
    before(app) {
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
    },
  },

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
    new HotModuleReplacementPlugin({ multiStep: true }),
  ],
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      // https://webpack.js.org/plugins/terser-webpack-plugin/
    ],
    splitChunks: splitChunksConfigs.dev,
  },
  watch: true,
};
