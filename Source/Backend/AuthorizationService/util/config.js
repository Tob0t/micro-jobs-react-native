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

    getAccessTokenLifetime: function(){
        return nconf.get("security:accessTokenLifeTime");
    },

    getRefreshTokenLifetime: function(){
        return nconf.get("security:refreshTokenLifeTime");
    },

    getMessageGatewayUrl: function(){
        return nconf.get("message_gateway_url");
    }
};