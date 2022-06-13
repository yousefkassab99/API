


import mongoose from 'mongoose';


export class UserSchema {
    constructor() {
        this.UserSchema = new mongoose.Schema({
            name: {
              type: String,
              required: true,
              unique: true,
            },
            email: {
              type: String,
              required: true,
              unique: true,
            },
            password: {
              type: String,
              required: true,
            },
            type: {
              type: String,
              required: true,
            },
            pio: {
              type: String,
              required: true,
            },
          },
          { timestamps: true });

            const User = mongoose.model("User", UserSchema,"Users"); //model name, schema, collection
      }

    async getAll() {
        return await this.UserSchema.find();
    }

    async getById(id) {
        return await this.UserSchema.findById(id);
    }

    async create(UserSchema) {
        const newUser = new this.UserSchema(UserSchema);
        await newUser.save();

        return newUser;
    }

    async update(id, UserSchema) {
        const updatedUser = this.UserSchema.findById(id);
        Object.keys(UserSchema).forEach(k => {
          updatedUser[k] = UserSchema[k];
        });

        await updatedUser.save();

        return updatedUser;
    }

    async delete(id) {
        await this.UserSchema.deleteOne({ _id: id });
    }
}