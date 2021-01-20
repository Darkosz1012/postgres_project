require('dotenv').config();


const express = require('express')
const mountRoutes = require('./routes')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

mountRoutes(app)


const jwt = require("jsonwebtoken");
(async function run () {
    console.log(jwt.sign({ username: "Admin", id_user: 1, role: "admin"}, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' }));   
})()


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})