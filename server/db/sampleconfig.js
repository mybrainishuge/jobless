module.exports = {
  username: 'root',
  password: 'pass',
  database: 'job',
  config: {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
};
