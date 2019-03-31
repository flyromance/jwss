const webpackMerge = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./config");
const baseConfig = require("./webpack.base.config");
const utils = require("./utils");

module.exports = webpackMerge(baseConfig, {
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash:8].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash:8].js"),
    publicPath: config.build.assetsPublicPath
  },
  devtool: false,
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
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
      filename: utils.assetsPath("css/[contenthash:8].css")
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: true,
      chunks: ["app"],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: "dependency"
    })
  ]
});
