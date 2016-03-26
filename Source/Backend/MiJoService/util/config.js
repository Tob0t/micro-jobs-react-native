var nconf = require("nconf");

nconf.argv()
    .file({ file: "./config.json" });

module.exports = {
    getPort: function(){
        return nconf.get("port");
    },

    getLogDirectory: function(){
        return nconf.get("log_directory");
    },

    getDatabaseUrl: function(){
        return nconf.get("database_url");
    },

    getMicroServiceGatewayUrl: function(){
        return nconf.get("micro_service_gateway_url");
    },

    getShareUrl: function(){
        return nconf.get("share_url");
    }
};