const sso = require("@xxx/sso");

module.exports = ({ config }, options) => {
  const { appkey } = config;
  options = Object.assign({ appkey }, config.sso, options);
  if (typeof options === "undefined") throw new TypeError("[Turbo] sso require `appkey` and `secret`");
  const { bypass } = options;
  const auth = sso(options);
  return async (ctx, next) => {
    const { req, res } = ctx;
    if (Array.isArray(bypass) && bypass.some(rule => (rule instanceof RegExp ? rule.test(req.url) : req.url === rule)))
      return await next();
    try {
      ctx.sso = await auth(req, res);
    } catch (e) {
      console.error("[Turbo] sso throw an error", e);
    }
    if (ctx.sso) {
      await next();
    } else {
      ctx.respond = false;
    }
  };
};
