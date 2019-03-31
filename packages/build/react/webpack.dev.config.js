var path = require("path");
var utils = require("./utils");
var webpack = require("webpack");
var config = require("./config");
var merge = require("webpack-merge");
var baseWebpackConfig = require("./webpack.base.config");
var HtmlWebpackPlugin = require("html-webpack-plugin");
// var FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
var env = "dev";
if (process.env.NODE_ENV === "production") env = "pro";
if (process.env.NODE_ENV === "staging") env = "dev";
if (process.env.NODE_ENV === "test") env = "test";

/* 添加热更新相关代码到入口分片 */
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = [path.join(__dirname, "dev-client")].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  output: {
    path: config.dev.assetsRoot,
    filename: "[name].js",
    publicPath: config.dev.assetsPublicPath
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  devtool: "#cheap-module-eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      chunks: ["app"],
      inject: true
    }),
    // new FriendlyErrorsPlugin(),
    function() {
      this.plugin("done", function(stats) {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.log(stats.compilation.errors);
          process.exit(1);
        }
      });
    }
  ]
});
