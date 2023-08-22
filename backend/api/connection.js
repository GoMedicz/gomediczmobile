const Sequelize = require("sequelize");

const connection = new Sequelize(
    'gomedics_db',
    'postgres',
    'root',
    {
        host: '127.0.0.1',
        dialect: 'postgres',
    },
  );

  connection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
module.exports = connection;