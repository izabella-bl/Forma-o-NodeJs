const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const perguntaModel = require("./database/pergunta");
const Resposta = require("./database/Resposta");


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
    perguntaModel.findAll({order:[['id','DESC']]}).then(perguntas => {
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

app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    perguntaModel.findOne({
        where:{id:id}
    }).then(pergunta=>{
        if(pergunta != undefined){  //Pergunta encontrada
            
           Resposta.findAndCountAll({
                where: {perguntaId: pergunta.id},
                order:[
                    ['id','DESC']
                ]
            }).then(respostas => { 
                pergunta.qtdResposta = respostas.count;
                pergunta.save();
                /*perguntaModel.create({
                    //qtdResposta:respostas.count
                   
                }).then(()=>{*/
                    res.render('pergunta',{
                        pergunta:pergunta,
                        respostas:respostas.rows,
        
                    });
                    
            });
        }else{
            res.redirect('/')
        }
    })
});

 app.post("/responder",(req,res) => {
       var corpo = req.body.corpo;
       var perguntaId = req.body.pergunta;

      Resposta.create({
           corpo:corpo,
           perguntaId:perguntaId
       }).then(() =>{
        res.redirect("/pergunta/"+perguntaId);
    });
 });

app.listen(8081,()=>{
    console.log("app rodando")
});