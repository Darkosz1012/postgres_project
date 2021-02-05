const { Pool } = require('pg')
const pool = new Pool({
  max: 1,
})
module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: async () => { return await pool.connect()}
}