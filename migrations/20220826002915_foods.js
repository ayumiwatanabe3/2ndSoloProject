/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("foods", (table) => {
    table.increments().index();
    table.boolean("state_delete").defaultTo(false);
    table.text("name");
    table.text("amount");
    table.text("cooking_date");
    table.text("cooking_by");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("foods");
};
