// Update with your config settings.

module.exports = {

    development: {
      client: 'pg',
      connection: {
        database: 'temp1',
        user:     'postgres',
        password: 'postgres'
      }
    },
  
    staging: {
      client: 'postgresql',
      connection: {
        database: 'temp1',
        user:     'postgres',
        password: 'postgres'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        database: 'temp1',
        user:     'postgres',
        password: 'postgres'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  
  };
  