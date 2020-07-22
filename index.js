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
    setCredentials: (username, password) => auth = {username, password},
    createUser: (name, nickname, password) => request("POST", "users", {
        name,
        nickname,
        password
    }),
    nametag: (name, tag) => request("GET", "nametag", {
        name,
        tag
    }),
    getUser: id => request("GET", `users/${encodeURIComponent(id)}`),
    setUser: (id, data) => request("POST", `users/${encodeURIComponent(id)}`, data),
    addReputation: (id, score) => request(
        "POST",
        `users/${encodeURIComponent(id)}/reputation`,
        {score}
    ),
    checkPassword: async (id, password) => (await request(
        "POST",
        `users/${encodeURIComponent(id)}/password/verify`,
        {password}
    )).matches,
    setPassword: async (id, password) => (await request(
        "POST",
        `users/${encodeURIComponent(id)}/password`,
        {password}
    )).matches,
    createSession: (user, address) => request(
        "POST",
        "sessions",
        {user, address}
    ),
    getSession: id => request("GET", `sessions/${encodeURIComponent(id)}`)
};