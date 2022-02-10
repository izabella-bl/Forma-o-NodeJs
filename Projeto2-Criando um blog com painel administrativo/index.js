const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriaController = require("./Categoria/CategoriaController");
const artigoController = require("./Artigo/ArtigoController");

const Artigo = require("./Artigo/Artigo");
const Categoria = require("./Categoria/Categoria");

app.set('view engine','ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com sucesso")
    }).catch((error) =>{
        console.log(error)
    });

app.use("/",categoriaController);
app.use("/",artigoController);

app.get("/",(req,res)=>{ 
   res.render("index");
});

app.listen(8088,()=>{
    console.log("app rodando")
});