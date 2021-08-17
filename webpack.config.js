const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const createHtml = require("./config/create-html");
const getEntry = require("./config/get-entry");
const defaultApps = ["index"]
const getPagePath = require("./config/get-page-path");

const defaultEntry = getEntry("./src/pages");
const defaultHtmlArr = createHtml(getPagePath("./src/pages"))
const getEntryFromApps = (apps)=>{
  return apps.reduce((res,app)=>{
    res[`${app}/${app}`] = `./src/pages/${app}/index.js`
    return res
  },{})
}

module.exports = (env, argv) => {
const {mode, env:{}} = argv;
const { apps="" } = env
const appsArr = [...apps.split(","), ...defaultApps];
const entry =  apps ? getEntryFromApps(appsArr): defaultEntry;
const htmlArr = apps ? createHtml(appsArr): defaultHtmlArr;

apps && console.log(`Webpack Build Apps: ${apps}`)

return ({
  entry,
  output: { path: path.join(__dirname, "build"), filename: "[name].js" },
  resolve: {
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
    ...htmlArr,
    new BundleAnalyzerPlugin({
      analyzerMode: mode === "production" ? "static" : "disabled",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      //https://webpack.js.org/plugins/terser-webpack-plugin/
    ],
    splitChunks: {
      cacheGroups: {
        // Split vendor code to its own chunk(s)
        vendors: {
          name: "vendor",
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: "all",
        },
      },
    },
  },
})}
