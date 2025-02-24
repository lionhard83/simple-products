import express, { Request, Response, NextFunction } from "express";
import albumsRouter from "./routes/albums";
import photosRouter from "./routes/photos";
import commentsRouter from "./routes/comments";
import postsRouter from "./routes/posts";

const app = express();
app.use(express.json());

app.use("/albums", albumsRouter); // delega di gestione url a sottofile o sottoRouter
app.use("/photos", photosRouter);
app.use("/comments", commentsRouter);
app.use("/posts", postsRouter);

app.get("/status", (_, res) => {
  res.json({ message: "Server is running" });
});

app.listen(3000, () => console.log("Server is running"));
