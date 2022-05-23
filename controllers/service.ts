import { Request, Response } from "express";
import mongoose from "mongoose";

import Service, { IService } from "../models/service";

export const getAllServices = async (req: Request, res: Response) => {
  const services = await Service.find();
  return res.status(200).json({ services });
};

export const createService = async (req: Request, res: Response) => {
  const service: mongoose.HydratedDocument<IService> = new Service({
    name: req.body.name,
  });
  await service.save();
  return res.status(200).json({ service });
};
