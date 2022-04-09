import { Request, Response, NextFunction } from "express";

import { verifyJWT } from "./jwt";

const unauthorizedResponse = (res: Response) => {
  return res.status(401).json({
    message: "Unauthorized",
  });
};

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
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
