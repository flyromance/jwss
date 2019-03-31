var path = require("path");

/* 根据环境变量设置资源目录地址 */
var env = process.env.NODE_ENV;

var cwd = process.cwd();

var config = {
  /* 线上构建配置 */
  build: {
    index: path.resolve(cwd, "dist/index.html"),
    assetsRoot: path.resolve(cwd, "dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "http://static.flyromance.com/",
    productionSourceMap: true
  },
  /* Dev server 配置 */
  dev: {
    port: 9002,
    assetsRoot: path.resolve(cwd, "dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    cssSourceMap: false
  }
};

module.exports = config;
