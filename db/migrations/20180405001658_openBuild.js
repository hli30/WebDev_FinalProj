
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('fname').notNullable();
      table.string('lname').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
    }),
    knex.schema.createTable('options', (table) => {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.float('price_per_contract',2).notNullable();
      table.datetime('expiry_date').notNullable();
      table.integer('qty').notNullable();
      table.enu('type', ['call', 'put']).notNullable();
      table.float('strike_price',2).notNullable();
      table.string('symbol', 10).notNullable();
    }),
    knex.schema.createTable('trades', (table) => {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('type');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('options'),
    knex.schema.dropTable('trades'),
    knex.schema.dropTable('users')
  ])
};
