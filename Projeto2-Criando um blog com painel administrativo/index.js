const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
var session = require('express-session');

const categoriaController = require("./Categoria/CategoriaController");
const artigoController = require("./Artigo/ArtigoController");
const userController = require("./User/UserController")

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
app.use("/",userController);

app.get("/",(req,res)=>{ 
   Artigo.findAll({
       order:[
           ['id','DESC']
       ],
       limit:5
   }).then( artigos => {
       Categoria.findAll().then(categorias =>{
        res.render("index",{artigos:artigos,categorias:categorias});
       });
   });
});

app.get("/:slug",(req,res) =>{
    let slug = req.params.slug;
    Artigo.findOne({
        where:{
            slug:slug
        }
    }).then(artigo => {
        if(artigo != undefined ){
            Categoria.findAll().then(categorias =>{
                res.render("artigo",{artigo:artigo,categorias:categorias});
            });

        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
});

app.get("/categoria/:slug", (req,res) =>{
    var slug = req.params.slug;
    Categoria.findOne({
        where:{
            slug:slug
        },
        include:[{model:Artigo}]
    }).then(categoria =>{
        if(categoria != undefined){

           Categoria.findAll().then(categorias => {
               res.render("index",{artigos: categoria.artigos,categorias:categorias})
           })

        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});



app.listen(8088,()=>{
    console.log("app rodando")
});