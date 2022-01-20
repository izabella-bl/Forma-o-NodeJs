const express = require("express");
const app = express();


app.set('view engine','ejs'); //Estou dizendo para o Express usar EJS como view engine
app.use(express.static('public')); //Criar arquivos estáticos(css,javascript(front-end)...)


app.get("/",(req,res)=>{ //app.get("/:nome/:lang",(req,res)...) -> com parametros
    var nome = "Ana";
    var idade = "24";
    var exibirMsg = false;

    var pessoas=[
        {nome:"Aline",idade:16},
        {nome:"Maria",idade:45},
        {nome:"Luana",idade:35}
    ]
    res.render("index",{
        nome:nome,
        idade:idade,
        ativa: "23/05/2019",
        msg:exibirMsg,
        pessoas:pessoas
        
    });
});

app.listen(8080,()=>{
    console.log("app rodando")
});