const express = require("express");
const router = express.Router();
const Categoria = require("./Categoria");
const slugify = require("slugify");

router.get("/admin/categorias/new",(req,res) =>{
      Categoria.findAll().then(categorias =>{
            res.render("admin/Categorias/new",{categorias})
      });
});

router.post("/categorias/save",(req,res) => {
      var title= req.body.title;
      if(title != undefined){
            Categoria.create({
                  title: title,
                  slug:slugify(title)
            }).then(()=>{
                  res.redirect("/admin/categorias");
            });
      }else{
            res.redirect("/admin/categorias/new");
      }
      
});

router.get("/admin/categorias",(req,res) =>{
      Categoria.findAll().then( categorias =>{
            res.render("admin/Categorias/index",{categorias:categorias})
      });
      
});

router.post("/categorias/delete",(req,res) =>{
      var id = req.body.id;
      if(id != undefined){ //verifica se é nulo

            if(!isNaN(id)){ //verificar se a informação não é numero
               Categoria.destroy({
                     where:{id:id}
               }).then(()=>{
                  res.redirect("/admin/categorias");
               });

            }else{
               res.redirect("/admin/categorias");
            }

      }else{ 
            res.redirect("/admin/categorias");
      }
});

router.get("/admin/categorias/edit/:id",(req,res) =>{
      var id = req.params.id;
      
      Categoria.findByPk(id).then(categoria => {
            if(categoria != undefined){
                  Categoria.findAll().then(categorias =>{
                        res.render("admin/Categorias/edit",{categorias:categorias,categoria:categoria});
                  })
              
            }else{
                  res.redirect("/admin/categorias");
            }
      }).catch(erro => {
            res.redirect("/admin/categorias");
      })
        
});

router.post("/categorias/update",(req,res)=>{
      var id = req.body.id;
      var title = req.body.title;

      Categoria.update({title:title, slug:slugify(title)},{
            where: {
                id:id
            }
      }).then(()=> {
            res.redirect("/admin/categorias");
      });
});

router.get("/artigos");

module.exports = router;