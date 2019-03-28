const http = require('http');
const Koa = require('koa');

const config = require('../config');

// 引入中间件


class JWS extends Koa {
  constructor() {
    supper();
    this.server = null;
    this.config = {};
    this.use(() => { });
  }

  // createContext() { }

  // callback() {
  //   let fn = compose(this.middleware);

  //   function handleRequest(req, res) {
  //     const context = this.createContext(req, res);
  //     fn(context)
  //       .then(() => {
  //         respond(context);
  //       })
  //       .catch((err) => {

  //       })
  //   }

  //   return handleRequest;
  // }

  start(cb) {
    const { port } = this.config;
    this.server = http.createServer(this.callback());
    this.server.listen(port, (err) => {
      this.emit('start', port);
      this.emit('listen', port);
      cb && cb(err);
    })
  }

  stop(cb) {
    const { server } = this;
    if (server && server.listening) {
      server.close((err) => {
        this.emit('stop', err);
        cb && cb(err);
      });
    } else {
      cb && cb();
    }
  }
}