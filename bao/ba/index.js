const url = require("url");
const crypto = require("crypto");
const assert = require("assert");

/**
 * [exports BasicAuth]
 * @param  {[string|object]} client_id      [client_id]
 * @param  {[string]}        client_secret  [client_secret]
 * @return {[function]}                     [description]
 */
module.exports = (client_id, client_secret) => {
  const SPACE = " ";
  const SPL = ":";
  const EOL = "\n";
  // options = { client_id, client_secret }
  if (typeof client_id === "object") {
    ({ client_id, client_secret } = client_id);
  }
  assert.ok(client_id, "client_id is required");
  assert.ok(client_secret, "client_secret is required");
  /**
   * [Calculate Signature]
   * @param  {[string]} method [http verb]
   * @param  {[string]} path   [http path]
   * @param  {[date]} date     [datetime]
   * @return {[object]}        [headers]
   */
  return function(method, path, date) {
    if (arguments.length == 1) {
      path = method;
      method = null;
    }
    path = url.parse(path || "/").pathname;
    method = (method || "GET").toUpperCase();
    date = (date || new Date()).toGMTString();
    // step1. GET /path
    const req = [method, path].join(SPACE);
    // step2. step1 + GMT date string .
    const header = [req, date].join(EOL);
    // step3. encrypt request
    const sha1 = crypto.createHmac("sha1", client_secret);
    // step4. base64ify.
    const token = sha1.update(header).digest("base64");
    // xxx:xxx
    const signature = [client_id, token].join(SPL);
    const authorization = ["MWS", signature].join(SPACE);

    return {
      Date: date,
      Authorization: authorization
    };
  };
};
