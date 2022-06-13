import express from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import {  UserSchema } from "../model/User.mjs";
const user = new UserSchema();

const salt = await bcrypt.genSalt();

export const login_route = express.Router();
export const UserRouter = express.Router();


//-------------------------------------------------------------------------
//login : ==>>
login_route.post(
    "/",
  
    async (req, res) => {
        user.login(req, res);
    }
);
//---------------------------------------------------------------------------
//find one
UserRouter.get("/:id/posts", async (req, res) => {
    const id = req.params.id;
    res.json(await user.getById(id));
});
//------------------------------------------------------------------------------------------
//fetch all  
UserRouter.get("/", async (req, res) => {
    res.json(await user.getAll());
});

//----------------------------------------------------------------------------------------------
//create
UserRouter.post(
    "/",
    async (req, res) => {
        const usr = req.body;
        usr._id = uuidv4();
        usr.password = await bcrypt.hash(req.body.password, salt);
        res.json(await user.create(usr));
    }
);
//---------------------------------------------------------------------------------------
//delete
UserRouter.delete("/", async (req, res) => {
    const id = req.body.id;
    if (!id) {
        res.status(400).json({ message: "this post can not be found !!" });
    }
    await user.delete(id);
    res.json({ message: "deleted successfully!!" });
});

 //---------------------------------------------------------------------------------------             
 //update
 UserRouter.put(
    "/",
    async (req, res) => {
      const id = req.body.id;
      const usr = req.body;
      usr._id = id;
      usr.password = await bcrypt.hash(req.body.password, salt);
      const u = await user.update(id, usr);
      res.json({ message: "updated successfully!!", data: u });
    }
  );


  //-----------------------------------------------------------------------------------------
