require("@babel/polyfill");
require("@babel/register")({
  presets: [["@babel/preset-env", {}]],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-decorators-legacy",
    "@babel/plugin-proposal-object-reset-spread",
    "@babel/plugin-transform-modules-commonjs"
  ]
});

// hack模块查找路径

// 检查node版本

// 发送消息

const App = require("./app");
const app = new App();

app.once("listen", port => {
  console.info("[JWSS] server is running at http://localhost:%s", port);
});

// 多核模式启动

app.start();
