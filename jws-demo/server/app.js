var JWS = require('./JWS_SERVER');

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

let { setAlias } = require('./alias');
setAlias({
    
});
const app = new JWS();

app.start();

