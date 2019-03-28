const path = require("path");
const fs = require("fs");

function watch(dir, options, handler) {
  // { persistent = true, recursive = false, encoding = 'utf8' }
  // dir 是文件夹或者文件名
  // handler: ( eventType, filename, )
  if (!exsits(dir)) return;
  return fs.watch(dir, options, handler);
}

function exsits(filename) {
  try {
    // filename是否是文件夹或者文件
    fs.accessSync(filename);
    return true;
  } catch (e) {
    return false;
  }
}

function resolve(name, paths) {
  for (let p of paths) {
    try {
      const filename = require.resolve(path.join(p, name));
      if (exsits(filename)) return filename;
    } catch (e) {}
  }
}

// 安全导入
function _import(name, options = {}) {
  let mod;
  let { cache, paths, safe } = Object.assign(
    {
      safe: false,
      cache: false,
      paths: [""]
    },
    options
  );

  let filename = resolve(name, paths);

  const { NODE_ENV = "development" } = process.env;
  if (cache === false && NODE_ENV === "development") {
    delete require.cache[filename];
    console.log("don't use `cache` option, it may make memory leak...");
  }

  if (safe && !filename) {
    return mod;
  } else if (!filename) {
    throw new Error(`cannot find module ${name}`);
  }

  try {
    mod = require(filename);
    if (mod.__esModule && "default" in mod) {
      mod = mod.default;
    }
  } catch (e) {
    console.log("import error:", e);
    throw e;
  }

  return mod;
}

module.exports = {
  exsits,
  watch,
  import: _import,
  resolve
};
