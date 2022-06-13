

import mongoose from 'mongoose';


export class commentSchema {
    constructor() {
        this.commentSchema = new mongoose.Schema({
          email: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          id: {
            type: id,
            required: true,
          },
        },
        
        
        { timestamps: true });

       const comment = mongoose.model("comment", commentSchema,"comments"); //model name, schema, collection
      }

    async getAll() {
        return await this.commentSchema.find();
    }

    async getById(id) {
        return await this.commentSchema.findById(id);
    }

    async create(commentSchema) {
        const newcomment = new this.commentSchema(commentSchema);
        await newcomment.save();

        return newcomment;
    }

    async update(id, commentSchema) {
        const updatedcomment = this.commentSchema.findById(id);
        Object.keys(commentSchema).forEach(k => {
          updatedcomment[k] = updatedcomment[k];
        });

        await updatedcomment.save();

        return updatedcomment;
    }

    async delete(id) {
        await this.commentSchema.deleteOne({ _id: id });
    }
}