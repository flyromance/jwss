const BA = require("..");

const ba = BA("client id", "secret");

// 生成 BA 认证的 Headers, 可以与任意 HTTP 客户端集成
const url = "http://localhost/mtba";
const headers = ba(/* method(optional): get , */ /* path or url */ url);

// 请求时添加 Headers 即可
const http = require("http");
const req = http.request(
  {
    headers
    // ...
  },
  res => {
    // ...
  }
);

req.end();
