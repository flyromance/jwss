#!/usr/bin/env node

const program = require("../lib/program");
const template = require("../template"); // 复制目录
// const connect = require("../lib/connect");
// const buildStatic = require("../build");

program()
  .command("help", function() {
    console.log();
    console.log("usage: trubo [command] [options]");
    console.log();
    console.log("new", "create project");
    console.log("start", "build and server");
    console.log("server", "start turbo server");
    console.log("build", "build static files");
    console.log("test", "run test for project");
    console.log("help", "show this help");
    console.log();
    console.log("--build", "");
    console.log("--watch", "");
    console.log("--memory", "");
  })
  .command("new", function({ name = "jws-project", type = "react" }) {
    // 新建工程目录
    template({ name, type });
  })
  .command("start", function({ dev }) {
    // 开启server  是否watch
    connect(dev);

    // 构建static files  是否watch  构建开发(不压缩...)还是线上版本(压缩、去掉垃圾代码)
    if (build) {
      buildStatic(config, { watch });
    }
  })
  .command("build", function() {
    // 构建static files
    // 通过process.env.NODE_ENV 来决定构建开发、线上版本
  })
  .command("test", function() {})
  .command("deploy", function() {})
  .parse();
