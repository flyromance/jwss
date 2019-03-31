const fs = require("fs");
const co = require("co");
const hbs = require("handgrip");
const { promisify } = require("util");

module.exports = options => {
  let { helpers } = options;
  if (typeof helpers === "function") {
    helpers = helpers(options);
  }
  if (typeof helpers === "object") {
    for (const name in helpers) {
      hbs.registerGeneratorHelper(name, helpers[name]);
    }
  }
  const readFile = promisify(fs.readFile);
  return {
    extension: "hbs",
    renderer: async (filename, locals) => {
      const content = await readFile(filename, "utf8");
      return co(hbs.render(content), locals);
    }
  };
};
