let { getEntry, } = require('./lib/utils');
let path = require('path');

module.exports = {
    entry: getEntry(), //
    output: {
        path: path.resolve(),
    },
    module: {
        rules: {

        }
    },
    plugins: [

    ],
    resolve: {
        alias: {

        },
        external: {

        },
        extensions: ['.js', '.jsx', '.json'],
    },
}
