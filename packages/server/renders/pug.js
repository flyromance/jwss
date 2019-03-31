const pug = require("pug");
/**
 *
 * @author Fan long
 */
module.exports = {
  extension: "pug",
  renderer: async filename => {
    return pug.compileFile(filename);
  }
};
