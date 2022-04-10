import { Request, Response } from "express";

import Service from "../models/service";
import "../utils/cache";

export const getAllServices = async (req: Request, res: Response) => {
  const services = await Service.find().cache({ key: "services" });
  return res.status(200).json({ services });
};
