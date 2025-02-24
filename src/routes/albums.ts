import express, { Request, Response, NextFunction } from "express";
import { albums } from "../data/albums";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(albums);
});

router.get("/:id", (req, res) => {
  const album = albums.find((item) => String(item.id) === req.params.id);
  album
    ? res.json(album)
    : res.status(400).json({ message: "album not found" });
});

export default router;
