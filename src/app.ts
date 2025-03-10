import express, { Request, Response, NextFunction } from "express";
import albumsRouter from "./routes/albums";
import photosRouter from "./routes/photos";
import commentsRouter from "./routes/comments";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";
import mongoose from "mongoose";

const db = "jph";

export const app = express();
app.use(express.json());

// app.use("/albums", albumsRouter); // delega di gestione url a sottofile o sottoRouter
// app.use("/photos", photosRouter);
// app.use("/comments", commentsRouter);
// app.use("/posts", postsRouter);
// app.use("/users", usersRouter);

app.get("/status", (_, res) => {
  res.json({ message: "Server is running" });
});

app.listen(3000, async () => {
  console.log("Server is running");
  await mongoose.connect(`mongodb://127.0.0.1:27017/${db}`);
  console.log("Db is connected!");
});
