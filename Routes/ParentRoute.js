const express=require("express");
const { createParent, getParents, getParentById, updateParent, deleteParent,ParentLogin } = require("../Controller/ParentController");
const ParentRouter=express.Router();

ParentRouter.post("/",createParent);
ParentRouter.get("/",getParents);
ParentRouter.get("/:parentid",getParentById);
ParentRouter.put("/:parentid",updateParent);
ParentRouter.delete("/:parentid",deleteParent);
ParentRouter.post("/login",ParentLogin);

module.exports=ParentRouter;