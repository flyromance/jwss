


// let { getEntry } = require("./lib/utils");

let path = require("path");

let CWD = process.cwd();

module.exports = {
  entry: path.join(CWD, "app.js"), //
  output: {
    path: path.resolve(CWD, "dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", {}], ["@babel/preset-react", {}]]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-decorators",
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true
      }
    ],
    "@babel/plugin-proposal-object-rest-spread"
  ],
  resolve: {
    alias: {},
    external: {},
    extensions: [".js", ".jsx", ".json"]
  }
};
