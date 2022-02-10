const express = require("express");
const router = express.Router();


router.get("/artigo",(req,res) => {
      res.send("Rota de artigo")
});

router.get("/adimin/artigo/new",(req,res) =>{
       res.send("Rota uma novo artigo")
});

module.exports = router;