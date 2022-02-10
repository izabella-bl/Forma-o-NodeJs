const Sequelize = require("sequelize");

const connection = new Sequelize('prodigy_media','root','formulario',{
     host:'localhost',
     dialect:'mysql'
});

module.exports = connection;