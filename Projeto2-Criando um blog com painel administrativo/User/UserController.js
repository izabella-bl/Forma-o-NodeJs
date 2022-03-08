const express = require("express");
const router = express.Router();
const User = require("./User");
const Categoria = require("../Categoria/Categoria")
const bcrypt = require("bcrypt");
const adminAuth = require("../middlewares/adminAuth");

 router.get("/admin/users",adminAuth,(req,res) =>{
     User.findAll().then(users =>{
        res.render("admin/Users/index",{users:users})

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

     User.findOne({where:{email:email}}).then(user =>{
         if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password,salt);
            
            User.create({
                email:email,
                password:hash
            }).then(() =>{
                res.redirect("/")
            }).catch(erro => {
                res.redirect("/");
            });
         }else{
            res.redirect("/");
         }
     });

});

router.get("/login",(req,res) =>{
  Categoria.findAll().then(categorias =>{
    res.render("admin/Users/login",{categorias:categorias});
  });
});

router.post("/authenticate",(req,res) =>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email:email}}).then(user =>{
        if( user != undefined){

            var correct = bcrypt.compareSync(password,user.password)
            if(correct){
                req.session.user = {
                    id:user.id,
                    email:user.email
                }
                res.redirect("/admin/artigo");
            }else{
                res.redirect("/");
            }
        }else{
            res.redirect("/");
        }
    });
});

router.get("/logout" , (req,res) =>{
    req.session.user = undefined;
    res.redirect("/");
});


module.exports = router;