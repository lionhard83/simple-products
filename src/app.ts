import express from "express";
import { products } from "./products";
import { posts } from "./data/allPosts";
import { comments } from "./data/comments";
import { albums } from "./data/albums";
import { photos } from "./data/photos";

const app = express();
app.use(express.json());

app.get("/status", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/posts", (req, res) => {
  let copyPosts = [...posts];
  if (req.query.userId) {
    copyPosts = copyPosts.filter(
      (item) => String(item.userId) === req.query.userId
    );
  }
  if (req.query.q) {
    copyPosts = copyPosts.filter(
      (item) =>
        item.body.includes(req.query.q as string) ||
        item.title.includes(req.query.q as string)
    );
  }

  res.json(copyPosts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((item) => String(item.id) === req.params.id);
  post ? res.json(post) : res.status(400).json({ message: "post not found" });
});

app.post("/posts", (req, res) => {
  if (req.body.userId && req.body.title && req.body.body) {
    const array = posts.map((item) => item.id);
    const newId = Math.max(...array) + 1;

    const newPost = {
      title: req.body.title,
      body: req.body.body,
      userId: req.body.userId,
      id: newId,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
  } else {
    res.status(400).json({ message: "missing fields in body" });
  }
});

app.put("/posts/:id", (req, res) => {
  const post = posts.find((item) => String(item.id) === req.params.id);
  if (post) {
    if (req.body.userId && req.body.title && req.body.body) {
      post.body = req.body.body;
      post.title = req.body.title;
      post.userId = req.body.userId;
      res.json(post);
    } else {
      res.status(400).json({ message: "missing fields" });
    }
  } else {
    res.status(404).json({ message: "post not found" });
  }
});

app.patch("/posts/:id", (req, res) => {
  const post = posts.find((item) => String(item.id) === req.params.id);
  if (post) {
    if (req.body.userId || req.body.title || req.body.body) {
      post.body = req.body.body || post.body;
      post.title = req.body.title || post.title;
      post.userId = req.body.userId || post.userId;
      res.json(post);
    } else {
      res.status(400).json({ message: "missing fields" });
    }
  } else {
    res.status(404).json({ message: "post not found" });
  }
});

app.get("/comments", (req, res) => {
  res.json(comments);
});

app.get("/comments/:id", (req, res) => {
  const comment = comments.find((item) => String(item.id) === req.params.id);
  comment
    ? res.json(comments)
    : res.status(400).json({ message: "comment not found" });
});

app.get("/albums", (req, res) => {
  res.json(albums);
});

app.get("/albums/:id", (req, res) => {
  const album = albums.find((item) => String(item.id) === req.params.id);
  album
    ? res.json(album)
    : res.status(400).json({ message: "album not found" });
});

app.get("/photos", (req, res) => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 20;
  let subPhotos = photos.filter((_, index) => index >= skip);
  subPhotos = subPhotos.filter((_, index) => index < limit);
  res.json(subPhotos);
});

app.get("/photos/:id", (req, res) => {
  const photo = photos.find((item) => String(item.id) === req.params.id);
  photo
    ? res.json(photo)
    : res.status(400).json({ message: "photo not found" });
});

app.listen(3000, () => console.log("Server is running"));
