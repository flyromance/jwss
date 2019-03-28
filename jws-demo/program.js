const minimist = require('minimist');

const program = (options) => {
  const commands = {};
  const api = {
    command: (name, fn) => {
      commands[name] = fn;
      return api;
    },
    exec: (command, args) => {
      let fn = commands[command];
      fn && fn.call(api, args);
    },
    parse: () => {
      // cli-name name1 name2 name3 --build --watch
      let argv = process.argv.slice(2); // [ name1, name2, name3, --build --watch ];
      let args = minimist(argv); // { _: [name1, name2, name3], {build: true, watch: true} }
      let command = args._[0];
      if (command in commands) {
        api.exec(command, args);
      } else {
        api.exec('help', args);
      }

      return api;
    }
  }
}



export default program;