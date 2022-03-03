const express = require("express");
const router = express.Router();
const Categoria = require("../Categoria/Categoria");
const Artigo = require("./Artigo");
const slugify = require("slugify");

router.use(express.static('public'));

router.get("/admin/artigo",(req,res) => {
      Artigo.findAll({
            include: [{model:Categoria}]
      }).then(artigos => {
            Categoria.findAll().then( categorias =>{
                  res.render("admin/Artigos/index",{artigos:artigos,categorias:categorias})
            });
      });
      
});

router.get("/admin/artigos/new",(req,res) =>{
      Categoria.findAll().then(categorias => {
           res.render("admin/Artigos/new",{categorias:categorias});
      });
       
});

router.post("/artigos/save", (req,res) =>{
     var title = req.body.title;
     var body = req.body.body;
     var categoria = req.body.categoria;

     Artigo.create({
           title:title,
           slug:slugify(title),
           body:body,
           categoriumId:categoria
     }).then(() =>{
           res.redirect("/admin/artigo");
     })
});

router.post("/artigos/delete",(req,res) =>{
      var id = req.body.id;
      if(id != undefined){ //verifica se é nulo

            if(!isNaN(id)){ //verificar se a informação não é numero
               Artigo.destroy({
                     where:{id:id}
               }).then(()=>{
                  res.redirect("/admin/artigo");
               });

            }else{
               res.redirect("/admin/artigo");
            }

      }else{ 
            res.redirect("/admin/artigo");
      }
});

router.get("/admin/artigos/edit/:id", (req,res)=>{
      var id = req.params.id;
        
      Artigo.findByPk(id).then(artigo => {
            if(artigo != undefined){
                  Categoria.findAll().then(categorias =>{
                        res.render("admin/Artigos/edit",{artigo:artigo,categorias:categorias});
                  });
               
            }else{
                  res.redirect("/admin/artigo");
            }
      }).catch(erro => {
            res.redirect("/admin/artigo");
      });
});

router.post("/artigos/update",(req,res)=>{
      var id = req.body.id;
      var title = req.body.title;
      var body = req.body.body;
      var categoria = req.body.categoria;

      Categoria.update({title:title, slug:slugify(title) , body:body, categoriumId:categoria},{
            where: {
                id:id
            }
      }).then(()=> {
            res.redirect("/admin/artigo");
      }).catch(erro => {
            res.redirect("/admin/artigo");
      });
});

router.get("/artigos/page/:num",(req,res) =>{
      var page = req.params.num;
      var offset = 0;

      if(isNaN(page) || page == 1){
            offset = 0;
      }else{
            offset = (parseInt(page) - 1)*5;  
      }

      Artigo.findAndCountAll({
            limit:5,
            offset:offset,
            order:[
                  ['id','DESC']
            ]
      }).then(artigos => {

            var next;
            if(offset + 5 >= artigos.count){
                  next = false;
            }else{
                  next = true;
            }

            var result ={
                  page:parseInt(page),
                  next:next,
                  artigos:artigos
            }

            Categoria.findAll().then(categorias =>{
                res.render("admin/Artigos/page",{categorias:categorias,result:result})
            });

      });
});

module.exports = router;