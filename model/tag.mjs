
import mongoose from 'mongoose';


export class tagSchema {
    constructor() {
        this.tagSchema = new mongoose.Schema({
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

       const tag = mongoose.model("tag", tagSchema,"tags"); //model name, schema, collection
      }

    async getAll() {
        return await this.tagSchema.find();
    }

    async getById(id) {
        return await this.tagSchema.findById(id);
    }

    async create(tagSchema) {
        const newtag = new this.tagSchema(tagSchema);
        await newtag.save();

        return newtag;
    }

    async update(id, tagSchema) {
        const updatedtag = this.tagSchema.findById(id);
        Object.keys(tagSchema).forEach(k => {
          updatedtag[k] = tagSchema[k];
        });

        await updatedtag.save();

        return updatedtag;
    }

    async delete(id) {
        await this.tagSchema.deleteOne({ _id: id });
    }
}