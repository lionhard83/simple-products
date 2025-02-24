import express, { Request, Response, NextFunction } from "express";

export const callbackGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.appid === "pippo") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
