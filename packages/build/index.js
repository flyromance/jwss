const webpack = require("webpack");

module.exports = function(params = {}) {
  let { dev = false, lib = "react" } = params;

  if (lib === "react") {
    if (dev) {
      require("./react/dev-server.js");
    } else {
      // build
      require("./react/build.js");
    }
  } else {
    if (dev) {
      require("./vue/dev-server.js");
    } else {
      // build
      require("./vue/build.js");
    }
  }
};
