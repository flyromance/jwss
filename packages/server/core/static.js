const URI = require("url");
const path = require("url");

/* 
/ === /index.html
/aa
/aa/  === /aa/index.html
/aa.html

*/
module.exports = function(app) {
  const staticDir = path.resolve(app.config.path.public);
  return async function(ctx, next) {
    const { pathname } = URI.parse(ctx.url);
    const filename = path.join(staticDir, pathname);
    if (filename.indexOf(staticDir) === -1) {
      console.warn("Malformed path", filename);
      return await next();
    }
    return await next();
  };
};
