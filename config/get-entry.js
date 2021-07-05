const getPath = require("./get-path");
module.exports = function getEnty(path) {
  return (getPath(path) || []).reduce((entry, el) => {
    console.log(el);
    entry[`${el}/${el}`] = `${path}/${el}/index.js`;
    return entry;
  }, {});
};
