
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('examine_lists', (table) => {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.string('rootSymbol').notNullable();
        table.datetime('expiry_date').notNullable();
        table.enu('type', ['Call', 'Put']).notNullable();
        table.float('strike_price',2).notNullable();
      })
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('examine_lists')
  ]);
  
};
