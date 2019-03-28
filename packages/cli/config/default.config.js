const path = require('path');

let cwd = process.cwd();

module.exports = {
  port: 8080,
  middlewares: [],
  routes: [],
  services: [],
  path: {
    root: cwd,
    
    client: path.join(cwd, 'client'),
    components: path.join(cwd, 'client', 'components'),

    server: path.join(cwd, 'server'),
    controllers: path.join(cwd, 'server', 'controllers'),
    datasources: path.join(cwd, 'server', 'datasources'),
    middlewares: path.join(cwd, 'server', 'middlewares'),
    services: path.join(cwd, 'server/services'),
    mock: path.join(cwd, 'server/mock'),
  },
}