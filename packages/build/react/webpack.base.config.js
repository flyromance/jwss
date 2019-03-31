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
    extensions: [".jsx", ".js", ".json"],
    alias: {
      "@": resolve("")
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env"], ["@babel/preset-react"]]
        },
        exclude: /node_modules/
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
