const { DllPlugin } = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const vendorDir = "./build/vendor";

module.exports = (env={}) => {
  const { analyzeBundle } = env;
  //command: npm run build-vendor --env analyzeBundle=true
  return {
    context: __dirname,
    entry: { vendor: ["react", "react-dom", "react-redux", "redux"] },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, vendorDir),
      library: "[name]_dll",
    },
    plugins: [
      new CleanWebpackPlugin(),
      new DllPlugin({
        name: "[name]_dll",
        path: path.resolve(__dirname, `${vendorDir}/vendor-manifest.json`),
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: analyzeBundle? "static" : "disabled",
      }),
    ],
  };
};
