const path = require("path");
const fs = require("fs");
const glob = require("glob");
const mkdirp = require("mkdirp");
const indent = require("strip-indent");
const yarnInstall = require("yarn-install");

let cwd = process.cwd();

function copyFile(from, to, options) {
  mkdirp.sync(path.dirname(to));

  // 大文件用stream
  if (/\.(png|jpg|jpeg|gif)$/.test(from)) {
    return fs.createReadStream(from).pipe(fs.createWriteStream(to));
  }

  // 默认编码为null，未指定编码返回buffer
  fs.readFile(from, "utf8", function(err, content) {
    if (err) {
      throw err;
    }

    if (from.indexOf())
      content = content.replace(/#\{(\w+)\}/g, function($0, $1) {
        return options[$1] || "";
      });

    fs.writeFile(to, content, function(err) {
      if (err) {
        throw err;
      }
    });
  });
}

function create_project(name, type) {
  let _cwd = path.join(cwd, name);
  mkdirp.sync(_cwd);

  let params = {
    name,
    user: process.env.USER || "",
    description: "Build with jws"
  };
  let rename = {
    npmrc: ".npmrc",
    npmignore: ".npmignore",
    gitignore: ".gitignore"
  };

  const templateDir = `${__dirname}/${type}`;
  glob.sync(`${templateDir}/**/*`, { dot: true }).forEach(from => {
    const filename = from.replace(templateDir + "/", "");
    const to = path.join(_cwd, filename);

    // 文件
    if (!fs.statSync(from).isDirectory()) {
      copyFile(from, to, params);
    }
  });

  yarnInstall({
    cwd: _cwd
  });
}

module.exports = function({ name, type }) {
  create_project(name, type);
};
