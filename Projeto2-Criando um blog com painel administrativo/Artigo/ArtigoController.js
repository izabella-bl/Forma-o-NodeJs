const express = require("express");
const router = express.Router();
const Categoria = require("../Categoria/Categoria");
const Artigo = require("./Artigo");
const slugify = require("slugify");

router.get("/admin/artigo",(req,res) => {
      Artigo.findAll({
            include: [{model:Categoria}]
      }).then(artigos => {
            res.render("admin/Artigos/index",{artigos:artigos});
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

module.exports = router;