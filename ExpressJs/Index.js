const express = require("express") //Importando o express
const app = express(); //Iniciando o express

app.get("/",function (req,res) {
    res.send("Bem vindo(a)!!!")
    
});

app.get("/blog/:artigo",function(req,res){
 
     var artigo = req.params.artigo;

     if(artigo){
         res.send("<h2>Artigo:"+artigo+"</h2>");
     }else{
         res.send("<h3>Why do we use it?</h3>");
     }
});

app.get("/cliente/:nome",function (req,res) {
    var nome = req.params.nome
    res.send("Ola,"+nome+"!!")
})

app.get("/dados",function (req,res) {
    var dados = req.query["nome"];
    res.send("Ola,"+dados+"!!")
    
})

app.listen(4000,function(erro) {
    if(erro){
        console.log("Ocorreu um erro!")
    }else{
        console.log("servidor iniciado com sucesso!")
    }
    
})
