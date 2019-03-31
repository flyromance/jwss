const path = require("path");
const webpack = require("webpack");
const express = require("express");
const config = require("./config");
const app = express();

const CWD = process.cwd();

const PORT = config.dev.port;

var webpackConfig = require("./webpack.dev.config");

const compiler = webpack(webpackConfig);

var devMiddleware = require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

var hotMiddleware = require("webpack-hot-middleware")(compiler, {
  log: () => {
    console.log("hot");
  }
});

// 改变模板时，刷新页面
compiler.plugin("compilation", function(compilation) {
  compilation.plugin("html-webpack-plugin-after-emit", function(data, cb) {
    hotMiddleware.publish({ action: "reload" });
    cb();
  });
});

app.use(devMiddleware);

app.use(hotMiddleware);

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static(path.join(CWD, config.dev.assetsRoot, config.dev.assetsSubDirectory)));

app.use(require("connect-history-api-fallback")());

var _resolve;
var readyPromise = new Promise(resolve => {
  _resolve = resolve;
});

devMiddleware.waitUntilValid(() => {
  console.log(`> 调试页面地址: http://localhost:${PORT}\n`);
  _resolve();
});

app.listen(PORT || 9003);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
};
