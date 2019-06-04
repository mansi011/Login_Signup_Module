
exports.up = function(knex, Promise) {
    return knex.schema.createTable('auth_token', function(table) {
        table.increments('id').unsigned().primary();
        table.text('token');
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');

        table.string('ip');
        table.timestamps(false, true);

        //table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');

    })
  
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('auth_token');
  
};
