var nconf = require("nconf");

nconf.argv()
    .file({file: "./config.json"});

module.exports = {
    getPort: function () {
        return nconf.get("port");
    },

    getLogDirectory: function () {
        return nconf.get("log_directory");
    }
};