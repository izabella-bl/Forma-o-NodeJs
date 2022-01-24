const Sequelize = require('sequelize');

const connection = new Sequelize('ask_everyone','root','root',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;