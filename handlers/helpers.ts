import logger from "../utils/logger";

import { Response } from "express";

// import User from "../models/user";
// import Service from "../models/service";
// import Otp from "../models/otp";

export const internalServerError = (res: Response) => {
  logger.error("Internal Server Error");
  return res.status(500).json({
    message: "Internal Server Error",
  });
};

export const notFound = (res: Response) => {
  logger.warn("Resource Not Found");
  return res.status(404).json({
    message: "Resource Not Found",
  });
};

export const unauthorizedResponse = (res: Response) => {
  logger.warn("Unauthorized Request");
  return res.status(401).json({
    message: "Unauthorized Request",
  });
};

export const resourceAbsent = (res: Response) => {
  logger.warn("Resource absent");
  return res.status(400).json({
    message: "Resource absent",
  });
};

export const alreadyPresent = (res: Response) => {
  logger.error("Resource already exists");
  return res.status(400).json({
    message: "Resource already exists",
  });
};

export const invalidData = (res: Response) => {
  logger.error("Invalid data");
  return res.status(400).json({
    message: "Invalid data",
  });
};
