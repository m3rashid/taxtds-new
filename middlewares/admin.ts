import { NextFunction, Request, Response } from "express";

const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  next();
};

export default checkAdmin;
