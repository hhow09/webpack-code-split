const getPath = require("./get-page-path");
module.exports = function getEnty(path) {
  return getPath(path).reduce((entry, el) => {
    entry[`${el}/${el}`] = `${path}/${el}/index.js`;
    return entry;
  }, {});
};
