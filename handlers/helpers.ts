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

const responses = (data: any, err: boolean) => {
  return {
    data: data,
    err: err,
  };
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return responses(user, true);
    }
    return responses(user, false);
  } catch (err) {
    return responses(false, true);
  }
};

export const findServiceById = async (id: string) => {
  try {
    const service = await Service.findById(id);
    if (!service) {
      return responses(service, true);
    }
    return responses(service, false);
  } catch (err) {
    return responses(false, true);
  }
};

export const findOtpByEmail = async (email: string) => {
  try {
    const otp = await Otp.find({ email: email });
    if (!otp) {
      return responses(otp, true);
    }
    return responses(otp, false);
  } catch (err) {
    return responses(false, true);
  }
};
