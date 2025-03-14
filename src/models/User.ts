import mongoose from "mongoose";

const Schema = mongoose.Schema;

type User = {
  email: string;
  password: string;
  validateEmailToken?: string;
  emailIsActive: boolean;
  accessToken?: boolean;
};

const UserSchema = new Schema<User>({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  validateEmailToken: { type: String },
  emailIsActive: { type: Boolean, default: false },
  accessToken: { type: String },
}); // i dati in entrata avranno questa forma

export const User = mongoose.model("User", UserSchema); // lo schema fa riferimento alla collezione users
