const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getPagePath = require("./get-page-path");
const siteInfo = require("./siteInfo.json");
const createHtml = (apps) =>
  apps.map(item => {
    let infoJson = {},
      infoData = {};
    try {
      infoJson = fs.readFileSync(`${page_path}/${item}/pageinfo.json`, "utf-8");
      infoData = JSON.parse(infoJson);
    } catch (err) {
      infoData = {};
    }

    return new HtmlWebpackPlugin({
      title: infoData.title ? infoData.title : siteInfo.siteName,
      meta: {
        keywords: infoData.keywords ? infoData.keywords : siteInfo.keywords,
        description: infoData.description ? infoData.description : siteInfo.description,
      },
      chunks: [`${item}/${item}`],
      template: "./src/template.html",
      filename: item == "index" ? "index.html" : `${item}/index.html`,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
    });
  });

module.exports = createHtml;
