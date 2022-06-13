import express from "express";
import { PostSchema } from "../model/post.mjs";
import { v4 as uuidv4 } from "uuid";
const posts = new PostSchema();


export const postRouter = express.Router();

//------------------------------------------------------
//find one
postRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const p = await posts.getById(id);
    res.json(p);
  });

  //----------------------------------------------------------
  //fetch all
  postRouter.get(
    "/",
    async (req, res) => {
       
      res.json(await posts.getAll());
    }
  );
  //---------------------------------------------------------
  //find one
  postRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const p = await posts.getById(id);
    res.json(p);
  });
  //---------------------------------------------------
  //find one
  postRouter.get("/:id/comments", async (req, res) => {
    const id = req.params.id;
    const p = await posts.getById(id);
    res.json(p);
  });
  //-------------------------------------------------
  //update
  postRouter.put(
    "/",
  
    async (req, res) => {
      try {
        const id = req.body._id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({ error: errors.array() });
          return;
        }
        const post = req.body;
        post._id = id;
        post.publish_date = new Date();
        res.json(await posts.update(id, post));
      } catch (error) {
        res.json({ message: error });
      }
    }
  );
  
//-----------------------------------------------------------------
//create
postRouter.post(
    "/",
  
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({ error: errors.array() });
          return;
        }
        const post = req.body;
        post._id = uuidv4();
        post.publish_date = new Date();
        res.json(await posts.create(post));
      } catch (error) {
        res.json({ message: error });
      }
    }
  );
  //-----------------------------------------------------------------------------------------
  
//delete
postRouter.delete("/", async (req, res) => {
    const id = req.body.id;
    if (!id) {
      res.status(400).json({ message: "this post can not be found !!" });
    }
    ;
    res.json(await posts.delete(id));
  });
  
  //------------------------------------------------------------------------------
  