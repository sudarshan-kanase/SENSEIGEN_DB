const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "senseigen_pvt_ltd",
  password: "Kana@7666",
  port: 5432,
});

module.exports = pool;