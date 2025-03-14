import express, { Request, Response } from "express";
import { User } from "../models/User";
import {
  body,
  param,
  matchedData,
  header,
  validationResult,
} from "express-validator";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { callbackGuard } from "../middleware/auth";
const SALT = 10;

const router = express.Router();

router.post(
  "/signup",
  body("email").trim().isEmail(),
  body("password").isStrongPassword(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
      return;
    }
    const { email, password } = matchedData(req);
    try {
      await User.create({
        email,
        password: await bcrypt.hash(password, SALT),
        validateEmailToken: v4(),
      });
      res.status(201).json({ message: "User created" });
    } catch (err) {
      res.status(409).json({ message: err });
    }
  }
);

router.get(
  "/validate/:validateToken",
  param("validateToken").isUUID(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
      return;
    }
    const user = await User.findOneAndUpdate(
      { validateEmailToken: req.params.validateToken },
      {
        emailIsActive: true,
        validateEmailToken: undefined,
        accessToken: v4(),
      }
    );
    if (!user) {
      res.status(404).json({ message: "invalid validate token" });
      return;
    }
    res.json({ message: "email has been validated" });
  }
);

router.post(
  "/login",
  body("email").trim().isEmail(),
  body("password").isStrongPassword(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
      return;
    }
    const { email, password } = matchedData(req);
    const user = await User.findOne({ email });
    if (!user || (await !bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "invalid credentials" });
      return;
    }
    res.json({ accessToken: user.accessToken });
  }
);

router.get("/me", callbackGuard, async (_: Request, res: Response) => {
  res.json(res.locals.user);
});

export default router;
