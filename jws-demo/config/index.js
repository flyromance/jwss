const path = require('path');
const extend = require('../lib/extend');
const _ = require('../lib/path');

const cwd = process.cwd();
const dir = process.env.CONFIG_DIR || 'config';
const env = process.env.NODE_ENV || 'development';

const configDir = path.join(cwd, dir);

module.exports = extend(
    true,
    {},
    _.import('default', { safe: true, paths: [configDir] }),
    _.import(env, { safe: true, paths: [configDir] }),
);