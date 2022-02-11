import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

import { verifyJWT } from "./jwt";
import { unauthorizedResponse } from "../handlers/helpers";

export interface SecureRequest extends Request {
  user?: string | JwtPayload;
}

const checkAuth = (req: SecureRequest, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    return unauthorizedResponse(res);
  }
  const { valid, expired, payload } = verifyJWT(token);
  if (!valid || expired) {
    return unauthorizedResponse(res);
  }
  req.user = payload?.sub;
  next();
};

export default checkAuth;
