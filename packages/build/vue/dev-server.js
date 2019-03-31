/* 设置环境变量 */
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

var config = require("./config");
var path = require("path");
var express = require("express");
var webpack = require("webpack");
var webpackConfig = require("./webpack.dev.config");

/* 设置 dev server 端口 */
var port = config.dev.port;

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

var hotMiddleware = require("webpack-hot-middleware")(compiler, {
  log: () => {}
});

/* 强制重刷页面，当 html 模板改变时 */
compiler.plugin("compilation", function(compilation) {
  compilation.plugin("html-webpack-plugin-after-emit", function(data, cb) {
    hotMiddleware.publish({ action: "reload" });
    cb();
  });
});

/* 历史记录中间件 */
app.use(require("connect-history-api-fallback")());

/* Serve Webpack 输出 */
app.use(devMiddleware);

/* 开启热替换中间件 */
/* 编译错误显示 */
app.use(hotMiddleware);

/* Serve 静态文件 */
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static(path.join(config.dev.assetsRoot, config.dev.assetsSubDirectory)));

var uri = "http://localhost:" + port;

var _resolve;
var readyPromise = new Promise(resolve => {
  _resolve = resolve;
});

console.log("> Starting dev server...");
devMiddleware.waitUntilValid(() => {
  console.log("> 调试页面地址: " + uri + "\n");
  _resolve();
});

var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
};
