import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

import Service, { IService } from "../../models/service";
import { clearHash } from "../../utils/newCache";

export const addService = async (req: Request, res: Response) => {
  const service: HydratedDocument<IService> = new Service({
    name: req.body.name,
  });
  await service.save();
  clearHash("services");
  res.sendStatus(200);
};

export const editService = async (req: Request, res: Response) => {
  const { serviceId, name } = req.body;
  const service = await Service.findByIdAndUpdate(serviceId, { name });
  clearHash("services");
  return res.status(200).json({
    message: "service updated successfully",
    service,
  });
};

export const deleteService = async (req: Request, res: Response) => {
  const { serviceId } = req.body;
  await Service.findByIdAndDelete(serviceId);
  clearHash("services");
  return res.status(200).json({ message: "service deleted successfully" });
};
