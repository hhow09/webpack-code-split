const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const createHtml = require("./config/create-html");
const getEntry = require("./config/get-entry");
const defaultApps = ["index"]
const getPagePath = require("./config/get-page-path");
const vendorEntry = require("./vendor")

const defaultEntry = getEntry("./src/pages");
const defaultHtmlArr = createHtml(getPagePath("./src/pages"))
const getEntryFromApps = (apps)=>{
  return apps.reduce((res,app)=>{
    res[`${app}/${app}`] = `./src/pages/${app}/index.js`
    return res
  },{})
}

module.exports = (env, argv) => {
const {env:{}} = argv;
const { apps="", buildVendor, analyzeBundle } = env
const appsArr = [...apps.split(","), ...defaultApps];
const entry = buildVendor? {vendor: vendorEntry} : apps ? getEntryFromApps(appsArr): defaultEntry;
const htmlArr = buildVendor? []: apps ? createHtml(appsArr): defaultHtmlArr;

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
      analyzerMode: analyzeBundle? "static" : "disabled",
    }),
    // new CleanWebpackPlugin(),
    // new IgnorePlugin({
    //   resourceRegExp: apps ? /react|react-dom/: /./,
    // })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      //https://webpack.js.org/plugins/terser-webpack-plugin/
    ],
    // splitChunks: {
    //   cacheGroups: {
    //     // Split vendor code to its own chunk(s)
    //     vendors: {
    //       name: "vendor",
    //       test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    //       chunks: "all",
    //     },
    //   },
    // },
  },
})}
