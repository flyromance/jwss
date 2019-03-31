#!/usr/bin/env node

let minimist = require("minimist");

let args = process.argv.slice(2);

let { _, ...params } = minimist(args);

require("../index.js")(params);
