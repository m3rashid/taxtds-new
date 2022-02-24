import { Request, Response } from "express";

import User from "../models/user";
import Service from "../models/service";
import Otp from "../models/otp";

export const internalServerError = (res: Response) => {
  return res.status(500).json({
    message: "Internal Server Error",
  });
};

export const notFound = (res: Response) => {
  return res.status(404).json({
    message: "Resource Not Found",
  });
};

export const unauthorizedResponse = (res: Response) => {
  return res.status(401).json({
    message: "Unauthorized Request",
  });
};

export const resourceAbsent = (res: Response) => {
  return res.status(400).json({
    message: "Resource absent",
  });
};

export const alreadyPresent = (res: Response) => {
  return res.status(400).json({
    message: "Resource already exists",
  });
};

export const invalidData = (res: Response) => {
  return res.status(400).json({
    message: "Invalid data",
  });
};
