import express from "express";


import { tagSchema } from "../model/tag.mjs";
const tags = new tagSchema();


export const tagRouter = express.Router();

//find one
tagRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const tag = await tags.getById(id);
    if (!tag) {
      return res.status(404).json("Not found !!");
    }
    res.json(tag);
  });
//---------------------------------------------------------------------
//fetch all
tagRouter.get("/", async (req, res) => {
    res.json(await tags.getAll());
  });

  //-------------------------------------------------------------
  //find posts belongs to tag
  tagRouter.get("/:id/posts", async (req, res) => {
    const id = req.params.id;
    res.json(await tags.getById(id));
  });
//---------------------------------------------------------------------  
//update
tagRouter.put(
    "/",
    async (req, res) => {
      const id = req.body.id;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
      }
      const post = req.body;
      const t = await tags.update(id, post);
      res.json({ message: "updated successfully!!", data: t });
    }
  );



//---------------------------------------------------------------------  
//create
tagRouter.post(
    "/",
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
      }
      const tag = req.body;
      const t = await tags.create(tag);
      res.json({ message: "created successfully!!", data: t });
    }
  );

//---------------------------------------------------------------------------------

//delete
tagRouter.delete("/", async (req, res) => {
    const id = req.body.id;
    if (!id) {
      res.status(400).json({ message: "this post can not be found !!" });
    }
    await tags.delete(id);
    res.json({ message: "deleted successfully!!" });
  });

  //-----------------------------------------------------------------------
