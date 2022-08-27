require("dotenv").config({
  path: "./.env.local",
});
const app = require("./app");
const knex = require("knex");

const knexfile = require("../knexfile");
const db = knex(knexfile);

const PORT = process.env.PORT || 9000;

(async () => {
  try {
    console.log("Running migrations...");
    await db.migrate.latest();

    console.log("Starting express...");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();

module.exports = db;
