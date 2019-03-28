const path = require('path');

let cwd = process.cwd();

module.exports = {
  appkey: '',
  port: 9999,

  middleware: [],
  //...
  path: {
    'client': path.join(cwd, 'client'),
    'server': path.join(cwd, 'server'),
  },
  // api配置
  datasource: {
    backend: {
      common: {
        protocal: 'http',
        base: '',
        ba: {

        },
      },
      thrift: {
        protocal: 'thrift',
      }
    },
  },
  //

}