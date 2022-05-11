import { Request, Response } from "express";

import Service from "../models/service";

export const getAllServices = async (req: Request, res: Response) => {
  const services = await Service.find();
  return res.status(200).json({ services });
};
