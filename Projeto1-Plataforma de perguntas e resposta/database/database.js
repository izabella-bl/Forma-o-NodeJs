const Sequelize = require('sequelize');

const connection = new Sequelize('ask_everyone','root','formulario',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;