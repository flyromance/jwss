var path = require("path");
var utils = require("./utils");
var webpack = require("webpack");
var config = require("./config");
var merge = require("webpack-merge");
var baseWebpackConfig = require("./webpack.base.config");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

var env = "pro";
if (process.env.NODE_ENV === "production") env = "pro";
if (process.env.NODE_ENV === "staging") env = "st";
if (process.env.NODE_ENV === "test") env = "test";
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
    publicPath: config.build.assetsPublicPath
  },
  plugins: [
    /* Vue 生产环境不显示 Warning */
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    /* 代码混淆 */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    /* 抽离 CSS 到单独文件 */
    new ExtractTextPlugin({
      filename: utils.assetsPath("css/[contenthash].css")
    }),
    /* 优化 CSS 合并重复 CSS */
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: {
    //     safe: true
    //   }
    // }),
    /* 生成入口 Html */
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: path.join(process.cwd(), "./index.html"),
      inject: true,
      chunks: ["app"],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: "dependency",
    })
  ]
});

module.exports = webpackConfig;
