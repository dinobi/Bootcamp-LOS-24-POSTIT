module.exports = {
  development: {
    username: 'postgres',
    password: 'Andela',
    database: 'postitdb',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'Andela',
    database: 'testdb',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'POSTIT_DATABASE_URL',
    dialect: 'postgres'
  }
  // production: {
  //   username: 'fixckoxwlujbjy',
  //   password: 'd8fefc83d9b0565d4dc9cbc94ad22a13883bd0e2e4de317e5b03bcc57d494d57',
  //   database: 'd3h76lbv286nah',
  //   host: 'ec2-23-21-169-238.compute-1.amazonaws.com',
  //   dialect: 'postgres',
  //   port: 5432
  // }
};
