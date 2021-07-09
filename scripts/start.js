#! /usr/bin/env node
"use strict";

const webpack = require("webpack");
const webpackServerDevConfig = require("../configs/webpack.dev.server.config");
const webpackClientDevConfig = require("../configs/webpack.dev.client.config");
const devServer = require("webpack-dev-server");
const clearConsole = require("react-dev-utils/clearConsole");
const logger = require("razzle-dev-utils/logger");
const printErrors = require("razzle-dev-utils/printErrors");
const config = require("../configs");
const verbose = false;

process.on("unhandledRejection", err => {
  clearConsole();
  logger.error("Unexpected error", err);
  process.exit(1);
});

function main() {
  return new Promise((resolve, reject) => {
    logger.log("compiling...");
    const clientCompiler = webpack(webpackClientDevConfig);

    const serverCompiler = webpack(webpackServerDevConfig);
    serverCompiler.run((runErrors, runStats) => {
      console.log(
        runStats.toString({
          cached: false,
          colors: true,
          assets: true,
          chunks: false,
          chunkModules: false,
          chunkOrigins: false,
          errors: true,
          errorDetails: true,
          hash: false,
          modules: false,
          timings: false,
          warnings: false,
          version: false,
        })
      );
    });
    const watching = serverCompiler.watch(
      {
        // Example [watchOptions](/configuration/watch/#watchoptions)
        aggregateTimeout: 300,
      },
      (err, stats) => {
        // [Stats Object](#stats-object)
        // Print watch/build result here...
        console.log(stats);
      }
    );

    logger.log("starting client dev server");
    const clientDevServer = new devServer(clientCompiler, webpackClientDevConfig.devServer);
    clientDevServer.listen(config.devClientPort, err => {
      if (err) {
        logger.error(err);
      }
    });

    [("SIGINT", "SIGTERM")].forEach(sig => {
      process.on(sig, () => {
        if (clientDevServer) {
          clientDevServer.close();
        }
        if (watching) {
          watching.close();
        }
      });
    });

    resolve();
  }).catch(console.error);
}

function compile(config, verbose) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    printErrors("Failed to compile.", [e], verbose);
    process.exit(1);
  }
  return compiler;
}

main();
