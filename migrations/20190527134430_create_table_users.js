
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').unsigned().primary();
        table.string('fname');
        table.string('lname');
        table.integer('age');
        table.string('email');
        table.string('password');
        table.timestamps(false, true);

    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
  
};
