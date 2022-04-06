import logger from "../utils/logger";

import { Response } from "express";

// import User from "../models/user";
// import Service from "../models/service";
// import Otp from "../models/otp";

const createResponse = (
  errorMessage: string | any,
  res: Response,
  stausCode?: number
) => {
  logger.error(errorMessage);
  return res.status(stausCode || 500).json({
    message: errorMessage,
  });
};

export const internalServerError = (res: Response) =>
  createResponse("Internal Server Error", res);

export const notFound = (res: Response) =>
  createResponse("Resource Not Found", res, 404);

export const unauthorizedResponse = (res: Response) =>
  createResponse("Unauthorized Request", res, 401);

export const resourceAbsent = (res: Response) =>
  createResponse("Resource Absent", res, 400);

export const alreadyPresent = (res: Response) =>
  createResponse("Resource Already Present", res, 409);

export const invalidData = (res: Response) =>
  createResponse("Invalid Data", res, 400);
