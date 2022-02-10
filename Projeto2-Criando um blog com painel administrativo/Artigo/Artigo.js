const Sequelize = require("sequelize");
const connection = require("../database/database");
const Categoria = require("../Categoria/Categoria");

const Artigo = connection.define('artigos',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    }, slug:{
        type:Sequelize.STRING,
        allowNull:false
    },body:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

Categoria.hasMany(Artigo); //Uma categoria  Pertence a muitos artigos (1-P-M)
Artigo.belongsTo(Categoria); //belongTo -> significa pertence a algo (1-P-1)

//Artigo.sync({force:true});

module.exports = Artigo;