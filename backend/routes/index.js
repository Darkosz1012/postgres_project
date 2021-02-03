
const login = require("./api/login")
const signup = require("./api/signup")
const updateToken = require("./api/update-token")

const user = require("./api/user")
const status = require("./api/status")
const restaurant = require("./api/restaurant")

module.exports = app => {
    app.use('/api/login', login)
    app.use('/api/signup', signup)
    app.use('/api/update-token', updateToken)

    app.use('/api/user', user)
    app.use('/api/status', status)
    app.use('/api/restaurant', restaurant)
}