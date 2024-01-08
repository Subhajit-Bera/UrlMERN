const express=require("express");
const router=express.Router();
const{shortenUrl,redirectToOriginal}=require("../controllers/urlController")
const {isAuth}=require("../middleware/isAuth");

router.post("/short",isAuth,shortenUrl);

router.get("/:short",redirectToOriginal);

module.exports=router;