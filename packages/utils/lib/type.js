function type(val) {
  // '[object Function]'
  return Object.prototype.toString
    .call(val)
    .slice(8, -1)
    .toLowerCase();
}

exports.isPlainObject = function isPlainObject(val) {
  return type(val) === "object";
};

exports.isArray = function isArray(val) {
  return type(val) === "array";
};
