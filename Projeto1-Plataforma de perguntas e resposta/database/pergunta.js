const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta',{
    titulo:{
        type:Sequelize.STRING,
        allowNull: false      //Não permite dados nulos 
    },
    descricao:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    qtdResposta:{
        type:Sequelize.INTEGER,
        allowNull:true
    }
});

Pergunta.sync({force:false}).then(() =>{}); //sicronizar com  Bancos de dados.(force:false): não vai forçar  a criação da tabela ,caso se a tabela já exista.

module.exports = Pergunta;