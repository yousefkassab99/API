import express from "express";
import { commentSchema } from "../model/comment.mjs";
 import { authorize } from "../middlewares/authorize.mjs";


 const comment = new commentSchema();

export const commentRouter = express.Router();
//-----------------------------------------------------------------
//find one
commentRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const tag = await comment.getById(id);
    if (!tag) {
      return res.status(404).json("Not found !!");
    }
    res.json(tag);
  });

  //-----------------------------------------------------------------

  //fetch all
  commentRouter.get("/", async (req, res) => {
    res.json(await comment.getAll());
  });

    //-----------------------------------------------------------------

    //create
    commentRouter.post(
    "/",
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
      }
      const comm = req.body;
      const c = await comment.create(comm);
      res.json({ message: "created successfully!!", data: c });
    }
  );

  //--------------------------------------------------------------------------------

//delete
commentRouter.delete(
    "/:id",
    Authorize,
    async (req, res) => {
      const id = req.params.id;
      const com = sequelize.query(`select * from comments where id = ${id}`);
      if (com == undefined) {
        res.status(400).json({ message: "this post can not be found !!" });
      }
      await comment.delete(id);
      res.json({ message: "successfully deleted !!" });
    }
  );
  