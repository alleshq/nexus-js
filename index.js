const axios = require("axios");
let auth = {
    username: "",
    password: ""
};

const request = async (method, endpoint, data) => (await axios({
    method,
    url: `http://localhost:8080/${endpoint}`,
    data,
    auth
})).data;

module.exports = {
    setCredentials: (username, password) => auth = {username, password}
};