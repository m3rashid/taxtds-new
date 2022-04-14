import { Request, Response } from "express";

import Service from "../models/service";
import { useCache } from "../utils/newCache";

export const getAllServices = async (req: Request, res: Response) => {
  const query = Service.find();
  const services = await useCache("services", query);

  return res.status(200).json({ services });
};
