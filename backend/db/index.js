const { Pool } = require('pg')
const pool = new Pool({
  max: 3,
})
module.exports = {
  query: (text, params) => pool.query(text, params)
}