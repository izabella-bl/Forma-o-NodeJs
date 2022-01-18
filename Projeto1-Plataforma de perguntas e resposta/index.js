const express = require("express");
const app = express();


app.set('view engine','ejs'); //Estou dizendo para o Express usar EJS como view engine


app.get("/",(req,res)=>{ //app.get("/:nome/:lang",(req,res)...) -> com parametros
    var nome = "Ana";
    var idade = "24";
    res.render("index",{
        nome:nome,
        idade:idade,
        ativa: "23/05/2019"
        
    });
});

app.listen(8080,()=>{
    console.log("app rodando")
});