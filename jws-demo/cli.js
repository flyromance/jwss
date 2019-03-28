const program = require('./program');

program()
  .command('help', function () {
    console.log();
    console.log('usage: trubo [command] [options]');
    console.log();
    console.log('new', 'create project');
    console.log('start', 'start turbo server');
    console.log('build', 'build static files');
    console.log('test', 'run test for project');
    console.log('help', 'show this help');
    console.log();
    console.log('--build', '');
    console.log('--watch', '');
    console.log('--memory', '');
  })
  .command('new', function () {
    // 新建工程目录
  })
  .command('start', function ({ watch, build, }) {
    // 开启server  是否watch
    // 构建static files  是否watch  构建开发(不压缩...)还是线上版本(压缩、去掉垃圾代码)
  })
  .command('build', function () {
    // 构建static files 
    // 通过process.env.NODE_ENV 来决定构建开发、线上版本
  })
  .command('test', function () {

  })
  .command('deploy', function () {

  })
  .parse()