import { Request, Response } from "express";

import User from "../models/user";
import Service from "../models/service";
import Otp from "../models/otp";

export const internalServerError = (res: Response) => {
  console.log("Internal Server Error");
  return res.status(500).json({
    message: "Internal Server Error",
  });
};

export const notFound = (res: Response) => {
  console.log("Resource Not Found");
  return res.status(404).json({
    message: "Resource Not Found",
  });
};

export const unauthorizedResponse = (res: Response) => {
  console.log("Unauthorized Request");
  return res.status(401).json({
    message: "Unauthorized Request",
  });
};

export const resourceAbsent = (res: Response) => {
  console.log("Resource absent");
  return res.status(400).json({
    message: "Resource absent",
  });
};

export const alreadyPresent = (res: Response) => {
  console.log("Resource already exists");
  return res.status(400).json({
    message: "Resource already exists",
  });
};

export const invalidData = (res: Response) => {
  console.log("Invalid data");
  return res.status(400).json({
    message: "Invalid data",
  });
};
