const fs = require("fs");
module.exports = function getPath(path) {
  const existpath = fs.existsSync(path);
  if (existpath) {
    const readdirSync = fs.readdirSync(path);
    return readdirSync.filter(item => {
      const currentPath = path + "/" + item;
      const isDirector = fs.statSync(currentPath).isDirectory();
      if (isDirector) return item;
    });
  } else return [];
};
