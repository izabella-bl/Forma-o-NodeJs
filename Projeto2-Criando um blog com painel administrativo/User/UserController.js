const express = require("express");
const router = express.Router();
const User = require("./User");
const Categoria = require("../Categoria/Categoria")
const bcrypt = require("bcrypt")

 router.get("/admin/users",(req,res) =>{
     User.findAll().then(users =>{
         Categoria.findAll().then(categorias =>{
            res.render("admin/Users/index",{users:users,categorias:categorias})
         });
            
     });
 });


 router.get("/admin/users/create",(req,res) =>{
    Categoria.findAll().then(categorias =>{
        res.render("admin/Users/create",{categorias:categorias})
     });
});


 router.post("/users/create",(req,res) =>{
     var email = req.body.email;
     var password = req.body.password;

     User.findOnde({where:{emaila:email}}).then(user =>{
         if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password,salt);
            
            User.create({
                email:email,
                password:hash
            }).then(() =>{
                res.redirect("/admin/users")
            }).catch(erro => {
                res.redirect("/admin/users");
            });
         }else{
            res.redirect("/admin/users");
         }
     });

});


module.exports = router;