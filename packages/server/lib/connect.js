let JWS = require('../server/app');
let setAlias = require('./alias');

// 为了让node 能够使用 @修饰器等
require('@babel/polyfill');
require('@babel/register')({
    preset: ['env'],
    plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-es2015-modules-commonjs'
    ],
});

// hack Module._findPath;
setAlias(config.path);



const app = new JWS();


app.start();