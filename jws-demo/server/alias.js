const { Module } = require('module');

// 每次调用require  require.resolve 就会执行下面的函数
module.exports.setAlias = function (configPath = {}) {
    // 每次调用require  require.resolve 就会执行下面的函数
    const _findPath = Module._findPath;
    Module._findPath = function (request, paths, isMain) {
        if (request.startsWith('@')) {
            // @components   @components/header 两种情况
            let index = request.indexOf('/');
            let prefix = request.slice(1, index === -1 ? request.length : index);
            let res = index === -1 ? '' : request.slice(index + 1);
            for (let key in configPath) {
                if (prefix === key) {
                    request = path.join(configPath[key], res);
                    break;
                }
            }
        }
        return _findPath(request, paths, isMain);
    }
}

