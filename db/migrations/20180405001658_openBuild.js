
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('fname').notNullable();
      table.string('lname').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
    }),
    knex.schema.createTable('watch_lists', (table) => {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('symbol').notNullable();
    }),
    knex.schema.createTable('options', (table) => {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.datetime('expiry_date').notNullable();
      table.enu('type', ['Call', 'Put']).notNullable();
      table.float('strike_price',2).notNullable();
      table.string('underlying', 10).notNullable();
    }),
    knex.schema.createTable('trade_types', (table) => {
      table.increments('id');
      table.string('type').notNullable();
      table.string('table_name').notNullable();
    }),
    knex.schema.createTable('trades', (table) => {
      table.increments('id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('trade_type_id').unsigned;
      table.foreign('trade_type_id').references('trade_types.id'); 
      table.datetime('transaction_date').notNullable();
      table.integer('qty').notNullable();
      table.float('price',5).notNullable();
      table.enu('action', ['Buy','Sell']).notNullable();
      table.integer('type_reference_id').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('trades'),
    knex.schema.dropTable('trade_types'),
    knex.schema.dropTable('options'),
    knex.schema.dropTable('watchLists'),
    knex.schema.dropTable('users')
  ])
};
