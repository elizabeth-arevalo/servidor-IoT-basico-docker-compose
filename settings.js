module.exports = {
    // the tcp port that the Node-RED web server is listening on
    uiPort: process.env.PORT || 1880,

    // By default, the Node-RED UI accepts connections on all IPv4 interfaces
    uiHost: "0.0.0.0",

    // Securing Node-RED
    // See http://nodered.org/docs/security.html for details
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "hash_me", // this is a hashed password "password"
            permissions: "*"
        }]
    },

    // other settings go here
};