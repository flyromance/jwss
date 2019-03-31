var path = require("path");
var utils = require("./utils");

/* 是否使用 CSS 单独抽离插件 */
var isExtract = process.env.NODE_ENV !== "development";

var cwd = process.cwd();

function resolve(dir) {
  return path.join(cwd, dir);
}

module.exports = {
  entry: {
    app: "./index.js"
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": resolve("")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: utils.cssLoaders({
            sourceMap: false,
            extract: isExtract
          })
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:8].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:8].[ext]")
        }
      }
    ]
  }
};
