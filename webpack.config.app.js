const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const createHtml = require("./config/create-html");
const getEntry = require("./config/get-entry");
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
    const { apps="" } = env
    const appsArr = apps.split(",");
    const entry = apps ? getEntryFromApps(appsArr): defaultEntry;
    const htmlArr = apps ? createHtml(appsArr): defaultHtmlArr;

    apps && console.log(`Webpack Build Apps: ${apps}`)

    return merge(commonConfig(env, argv), {
        entry,
        devtool: 'inline-source-map',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, './build'),
            library: 'app',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        plugins: [...htmlArr]
    })
}