module.exports = function() {
  return async function(next) {
    return await next();
  };
};
