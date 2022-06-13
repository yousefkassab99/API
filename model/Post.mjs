import mongoose from 'mongoose';


export class PostSchema {
    constructor() {
        this.PostSchema = new mongoose.Schema({
          id : {
            type: String,
            required: true,
            unique: true,
          },
      
          title: {
            type: String,
            required: true,
            unique: true,
          },
          content: {
            type: String,
            required: true,
          },
          stauts : {
            type: String,
            required: true,
            unique: true,
          },
          image: {
            type: String,
            required: false,
          },
          publish : {
            type: String,
            required: true,
            unique: true,
          },
          author: {
            type: String,
            required: true,
          },
      
          tags: {
            type: Array,
            required: false,
          },
        },
        { timestamps: true });

       const Post = mongoose.model("Post", PostSchema,"posts"); //model name, schema, collection
      }

    async getAll() {
        return await this.PostSchema.find();
    }

    async getById(id) {
        return await this.PostSchema.findById(id);
    }

    async create(PostSchema) {
        const newPost = new this.PostSchema(PostSchema);
        await newPost.save();

        return newPost;
    }

    async update(id, PostSchema) {
        const updatedPost = this.PostSchema.findById(id);
        Object.keys(PostSchema).forEach(k => {
          updatedPost[k] = PostSchema[k];
        });

        await updatedPost.save();

        return updatedPost;
    }

    async delete(id) {
        await this.PostSchema.deleteOne({ _id: id });
    }
}