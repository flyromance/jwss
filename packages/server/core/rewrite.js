/**
 * config.rewrite = [ { match: '/aa', to: '/bb' }, { match: /\/aa/, to: '/cc' } ]
 */
module.exports = app => {
  const { config } = app;
  const { rewrite } = config;
  return async (ctx, next) => {
    if (!rewrite) return await next();
    if (!Array.isArray(rewrite)) {
      throw new TypeError(`[jwssServer] rewrite rules must be an array, but got ${typeof rewrite}`);
    }
    const rule = rewrite.find(rule =>
      rule.match instanceof RegExp ? rule.match.test(ctx.url) : rule.match === ctx.url
    );
    if (rule) {
      const { match, to } = rule;
      ctx.url = ctx.url.replace(match, to);
    }
    await next();
  };
};
