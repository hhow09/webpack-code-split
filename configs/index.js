const devHost = "localhost";
const devClientPort = 3001;
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
  devHost,
  devClientPort,
  clientPublicPath: `${devHost}:${devClientPort}/`,
  splitChunksConfigs,
};
