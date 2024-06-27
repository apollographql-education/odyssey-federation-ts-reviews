module.exports = {
  development: {
    username: "root",
    password: null,
    database: "reviews_db_dev",
    dialect: "sqlite",
    storage: "src/datasources/reviews.db",
  },
  production: {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    use_env_variable: "DATABASE_URL",
  },
};
