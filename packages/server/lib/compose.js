module.exports = function(middlewares) {
  return function(context, next) {
    function dispatch(i) {
      let fn = middlewares[i];
      if (i === middlewares.length) fn = next;
      if (!fn) return Promise.resolve();

      try {
        return fn(context, dispatch.bind(null, i + 1));
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return dispatch(0);
  };
};

function c(fns) {
  return function(ctx) {
    let i = 0;
    function dispatch() {
      let fn = fns[i++];
      if (fn) {
        fn(ctx, dispatch);
      }
    }
    dispatch();
  };
}
