import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  surname: String,
  age: { type: Number, min: 0, require: true },
}); // i dati in entrata avranno questa forma

export const User = mongoose.model("User", UserSchema); // lo schema fa riferimento alla collezione users
