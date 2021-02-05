
const login = require("./api/login")
const signup = require("./api/signup")
const updateToken = require("./api/update-token")

const user = require("./api/user")
const status = require("./api/status")
const restaurant = require("./api/restaurant")
const product = require("./api/product")
const review = require("./api/review")
const ingredient = require("./api/ingredient")
const order = require("./api/order")

const productIngredient = require("./api/productIngredient")
const orderProduct = require("./api/orderProduct")
const userRestaurant = require("./api/userRestaurant")

const report = require("./api/report")

module.exports = app => {
    app.use('/api/login', login)
    app.use('/api/signup', signup)
    app.use('/api/update-token', updateToken)

    app.use('/api/user', user)
    app.use('/api/status', status)
    app.use('/api/restaurant', restaurant)
    app.use('/api/product', product)
    app.use('/api/review', review)
    app.use('/api/ingredient', ingredient)
    app.use('/api/order', order)

    app.use('/api/product-ingredient', productIngredient)
    app.use('/api/order-product', orderProduct)
    app.use('/api/user-restaurant', userRestaurant)

    app.use('/api/report', report)
}