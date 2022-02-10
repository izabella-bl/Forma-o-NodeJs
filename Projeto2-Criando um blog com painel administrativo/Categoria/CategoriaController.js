const express = require("express");
const router = express.Router();
const Categoria = require("./Categoria")


router.get("/categorias",(req,res) => {
      res.send("Rota de categoria")
});

router.get("/admin/categorias/new",(req,res) =>{
       res.render("admin/Categorias/new")
});

router.get("/categorias/save",(req,res) => {
      var title= req.body.title;
      if(title != undefined){

      }else{
            res.redirect("/admin/categorias/new");
      }
      
});

module.exports = router;