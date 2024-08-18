import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { getEnv } from "../utils";
import { UserPayload } from "../types";


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req?.cookies?.auth_token;
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, getEnv('JWT_SECRET')) as UserPayload
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
