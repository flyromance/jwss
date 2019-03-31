const http = require("http");
const Koa = require("koa");

const config = require("./config");

// middleware
const render = require("./core/render");
const router = require("./core/router");
const logger = require("./core/logger");
const _static = require("./core/static");
const rewrite = require("./core/rewrite");
const service = require("./core/service");
const responder = require("./core/responder");
const datasource = require("./core/datasource");
const middleware = require("./core/middleware");
const controller = require("./core/controller");

// 引入中间件

class JWSSServer extends Koa {
  constructor() {
    supper();
    // this.middleware = [];
    // this.env = process.env.NODE_ENV || 'development';
    // this.context = Object.create(context);
    // this.request = Object.create(request);
    // this.response = Object.create(response);
    this.server = null;
    this.config = config;
    this._init();
  }

  _init() {
    this.use(render(this)); // 加载模板引擎，返回空函数
    this.use(router(this)); // 加载路由匹配规则，获取匹配规则
    this.use(logger(this)); // 加载打印，返回空函数
    this.use(_static(this)); // ，配置静态文件规则，
    this.use(rewrite(this)); // ，设置重写配置
    this.use(service(this)); // 加载，
    this.use(responder(this)); //
    this.use(datasource(this)); // 加载数据源
    this.use(middleware(this)); // 加载中间件
    this.use(controller(this)); //
  }

  // createContext(req, res) {
  //   const context = Object.create(this.context);
  //   const request = (context.request = Object.create(this.request));
  //   const response = (context.response = Object.create(this.response));

  //   context.app = request.app = response.app = this;
  //   context.req = request.req = response.req = req;

  //   return context;
  // }

  // callback() {
  //   let fn = compose(this.middleware);
  //   let that = this;
  //   function handleRequest(req, res) {
  //     const context = that.createContext(req, res);
  //     fn(context)
  //       .then(() => {
  //         respond(context);
  //       })
  //       .catch((err) => {
  //         context.onerror(err);
  //       })
  //   }

  //   return handleRequest;
  // }

  // user(fn) {
  //   if (typeof fn !== "function") throw new TypeError("middleware must be a function");
  //   this.middleware.push(fn);
  //   return;
  // }

  // listen(...args) {
  //   const server = http.createServer(this.callback());
  //   return server.listen(...args);
  // }

  // 不用koa的listen方法
  start(cb) {
    const { port } = this.config;

    this.server = this.listen(port, function(err) {
      this.emit("start", port);
      this.emit("listen", port);
      cb && cb(err);
    });
  }

  stop(cb) {
    const { server } = this;
    if (server && server.listening) {
      server.close(err => {
        this.emit("stop", err);
        cb && cb(err);
      });
    } else {
      cb && cb();
    }
  }
}

module.exports = JWSSServer;
