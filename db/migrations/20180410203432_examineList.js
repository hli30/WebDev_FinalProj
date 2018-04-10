
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('examine_lists', (table) => {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.string('rootSymbol',8).notNullable();
        table.string('expiry_date',8).notNullable();
        table.string('type',2).notNullable();
        table.float('strike_price',2).notNullable();
      })
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('examine_lists')
  ]);
  
};
