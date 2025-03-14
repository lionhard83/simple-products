import express, { Request, Response, NextFunction } from "express";
import albumsRouter from "./routes/albums";
import photosRouter from "./routes/photos";
import commentsRouter from "./routes/comments";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import mongoose from "mongoose";
import "dotenv/config";

export const app = express();
app.use(express.json());

console.log(process.env);

app.use("/auth", authRouter);

app.use("/albums", albumsRouter); // delega di gestione url a sottofile o sottoRouter
// app.use("/photos", photosRouter);
// app.use("/comments", commentsRouter);
// app.use("/posts", postsRouter);
// app.use("/users", usersRouter);

app.get("/status", (_, res) => {
  res.json({ message: "Server is running" });
});

app.listen(3000, async () => {
  console.log("Server is running");
  await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}}`);
  console.log("Db is connected!");
});
