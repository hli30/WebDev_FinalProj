
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('examine_lists', (table) => {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.string('symbol',25).notNullable();
      })
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('examine_lists')
  ]);
  
};
