const URI = require("url");
const http = require("http");
const crypto = require("crypto");
const qs = require("querystring");
const ba = require("@mtfe/ba");
// http://wiki.mt.com/pages/viewpage.action?pageId=68742240
module.exports = ({
  name = "sso",
  appkey,
  secret,
  prefix = "",
  callbackURL = "",
  sso = "https://sso.mt.com",
  api = "http://api.sso-in.mt.com"
}) => {
  const { NODE_ENV = "development" } = process.env;
  if (NODE_ENV === "development") {
    // 原 dev 环境地址
    // sso = api = 'http://develop.sso.test.mt.info';
    // 原 dev 环境由于稳定性问题会逐步迁移到 beta 环境, @zhuoyue02
    sso = api = "http://sso.it.beta.mt.com";
  }
  // parseCookie
  const parseCookie = cookie =>
    (cookie || "").split(/;\s?/).reduce((cookies, item) => {
      const [key, value] = item.split("=");
      cookies[key] = value;
      return cookies;
    }, {});
  // parseBody
  const parseBody = stream =>
    new Promise((resolve, reject) => {
      const buffer = [];
      stream
        .on("error", reject)
        .on("data", chunk => buffer.push(chunk))
        .on("end", () => {
          resolve(Buffer.concat(buffer));
        });
    });
  // logout
  const logout = sid => {
    return new Promise((resolve, reject) => {
      http
        .get(`${api}/api/logout/${sid}`, res => {
          parseBody(res)
            .then(data => JSON.parse(data))
            .then(resolve)
            .catch(reject);
        })
        .end();
    });
  };
  // deprecated
  const deprecated = (obj, field, instead) => {
    Object.defineProperty(obj, field, {
      get() {
        console.warn(`[@mtfe/sso] "${field}" field deprecated, use "${instead}" instead`);
        return this[instead];
      }
    });
  };
  // getSession
  const getSession = token =>
    new Promise((resolve, reject) => {
      const url = `${api}/oauth2.0/userinfo?access_token=${token}`;
      const options = Object.assign({}, URI.parse(url), {
        headers: ba(appkey, secret)(url)
      });
      const req = http
        .request(options, res => {
          parseBody(res)
            .then(data => data.toString())
            .then(data => JSON.parse(data))
            .then(({ code, attributes }) => {
              if (code === 200) {
                const { login } = attributes;
                attributes.mis = login;
                attributes.misId = login;
                attributes.username = login;
                attributes.logout = logout.bind(this, token);
                attributes.avatar = `https://mss.mt.com/v1/mss_491cda809310478f898d7e10a9bb68ec/static0/profile/${login}`;
                attributes.toJSON = ({ fields } = {}) => {
                  fields = fields || Object.keys(attributes);
                  fields = fields.filter(x => typeof attributes[x] !== "function");
                  return fields.reduce((obj, key) => {
                    obj[key] = attributes[key];
                    return obj;
                  }, {});
                };
                deprecated(attributes, "misId", "username");
                deprecated(attributes, "login", "username");
                return attributes;
              } else {
                console.error("[@mtfe/sso] response an error:", code);
              }
            })
            .then(resolve)
            .catch(reject);
        })
        .end();
    });
  const getAccessToken = code => {
    const obj = {
      code,
      grant_type: "code",
      client_id: appkey,
      client_secret: secret
    };
    const url = Object.keys(obj).reduce(
      (url, name, i) => `${url}${i ? "&" : "?"}${name}=${obj[name]}`,
      `${api}/oauth2.0/accessToken`
    );
    return new Promise((resolve, reject) => {
      http
        .request(URI.parse(url), res => {
          parseBody(res)
            .then(data => data.toString())
            .then(data => {
              try {
                return JSON.parse(data);
              } catch (e) {
                console.error("[@mtfe/sso] %s response error:", url, e.message, data);
              }
            })
            .then(data => {
              if (data.error) return reject(data.error);
              resolve(data);
            })
            .then(reject);
        })
        .end();
    });
  };

  const auth = async (req, res) => {
    const { cookie } = req.headers;
    const sid = parseCookie(cookie)[name];
    const currentURI = URI.parse(req.url, true);
    const callbackURI = callbackURL ? URI.parse(callbackURL, true) : currentURI;
    const { code, next = "/" } = currentURI.query;
    let user;
    // 1. 检查当前站点 Cookie 中是否存在 sso-id
    if (sid) user = await getSession(sid);
    if (user) {
      // 1.1 如果存在且有效，则直接返回
      return user;
    } else if (currentURI.pathname === callbackURI.pathname && code) {
      // 2. 如果不存在 Cookie 并且当前请求是来自 sso 的 callback-url
      const { expires, access_token, refresh_token, refresh_expires } = await getAccessToken(code);
      // 2.2 如果返回数据有效，则写入 Cookie 跳转会源（or "原"）地址
      //     然后会走 step 1 的逻辑返回
      res.writeHead(302, {
        Location: next,
        "Set-Cookie": `${name}=${access_token}; path=/; httponly;`
      });
      res.end(`redirect to ${next}`);
    } else {
      // 3. 如果不存在 Cookie 并且当前请求不是来自 sso 的 callback-url
      //    那么认为该站点没有授权，需要跳转至 sso 授权，并且携带返回信息 callback-url
      // https://wiki.mt.com/pages/viewpage.action?pageId=632395521
      callbackURI.protocol = req.headers["x-forwarded-proto"] || "http:";
      callbackURI.host = req.headers.host;
      callbackURI.query.next = prefix + req.url;
      callbackURI.pathname = prefix + callbackURI.pathname;
      delete callbackURI.search; // fix bug
      const redirectURL = encodeURIComponent(URI.format(callbackURI));
      const Location = `${sso}/oauth2.0/authorize?client_id=${appkey}&redirect_uri=${redirectURL}`;
      res.writeHead(302, { Location });
      res.end(`redirect to ${Location}`);
    }
  };
  auth.logout = logout;
  return auth;
};
