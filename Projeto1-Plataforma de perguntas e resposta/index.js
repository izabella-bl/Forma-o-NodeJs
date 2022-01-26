const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const perguntaModel = require("./database/pergunta");

connection
    .authenticate().then(()=>{
    console.log("Conexao feita com Bancos de dados!")
    })
    .catch((msgErro)=>{
        console.log(msgErro)
    })

app.set('view engine','ejs'); 
app.use(express.static('public')); 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{ 
    perguntaModel.findAll().then(perguntas => {
        res.render("index",{
            perguntas:perguntas
        });
    });
   
});

app.get("/perguntar",(req,res)=>{
   res.render("perguntar");
});

app.post("/salvarpergunta",(req,res)=>{

   var titulo = req.body.titulo;
   var descricao = req.body.descricao;
   //res.send("Formulario recebido!"+titulo+"-"+descricao);

   perguntaModel.create({
       titulo: titulo,
       descricao: descricao
   }).then(() =>{
       res.redirect("/");
   });
});

app.listen(8081,()=>{
    console.log("app rodando")
});