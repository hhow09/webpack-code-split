const fs = require("fs");
module.exports = function getPagePath(path) {
  const existpath = fs.existsSync(path);
  if (existpath) {
    return fs.readdirSync(path).filter(item => {
      const currentPath = path + "/" + item;
      const isDirector = fs.statSync(currentPath).isDirectory();
      //only return the first-layer-directory name
      if (isDirector) return item;
    });
  } else return [];
};
