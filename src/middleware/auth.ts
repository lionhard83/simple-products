import express, { Request, Response, NextFunction } from "express";
import {
  body,
  param,
  matchedData,
  header,
  validationResult,
} from "express-validator";
import { User } from "../models/User";

export const callbackGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({
    accessToken: req.headers.authorization,
  }).select("email _id");
  if (!user) {
    res.status(401).json({ message: "invalid access token" });
    return;
  }
  res.locals.user = user;
  next();
};

export const handleExpressValidatorError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
    return;
  }
  next();
};
