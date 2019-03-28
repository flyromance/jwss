let isArray = require("./type").isArray;
let isPlainObject = require("type").isPlainObject;

function extend() {
  var args = Array.prototype.slice.call(arguments);
  var deep, target, sources;

  if (typeof args[0] !== "boolean") {
    deep = false;
    target = args[0];
    sources = args.slice(1);
  } else {
    deep = args[0];
    target = args[1];
    sources = args.slice(2);
  }

  // 如果不存在
  if (!target) {
    target = {};
  }

  sources.forEach(function(source, index) {
    Object.keys(source).forEach(function(key, index) {
      var source_val = source[key];
      var target_val = target[key];
      var is_array = false,
        target_copy_val;
      if (deep && (isPlainObject(source_val) || (is_array = isArray(source_val)))) {
        if (is_array) {
          target_copy_val = isArray(target_val) ? target_val : [];
        } else {
          target_copy_val = isPlainObject(target_val) ? target_val : {};
        }
        target[key] = extend(deep, target_copy_val, source_val);
      } else {
        if (typeof source_val !== "undefined") {
          target[key] = source_val;
        }
      }
    });
  });

  return target;
}

module.exports = extend;
