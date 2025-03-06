import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  validateEmailToken: { type: String },
  emailIsActive: { type: Boolean, default: false },
  accessToken: { type: String },
}); // i dati in entrata avranno questa forma

export const User = mongoose.model("User", UserSchema); // lo schema fa riferimento alla collezione users
