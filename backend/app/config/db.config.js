module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Qazaq12#",
  DB: "playoff_challenge",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};