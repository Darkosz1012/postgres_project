
const login = require("./api/login")
const signup = require("./api/signup")
const updateToken = require("./api/update-token")

const status = require("./api/status")

module.exports = app => {
    app.use('/api/login', login)
    app.use('/api/signup', signup)
    app.use('/api/update-token', updateToken)

    app.use('/api/status', status)
}