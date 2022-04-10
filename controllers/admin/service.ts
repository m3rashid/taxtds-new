import { Request, Response } from "express";

import Service from "../../models/service";
import { clearHash } from "../../utils/cache";

export const addService = async (req: Request, res: Response) => {
  const service = new Service({ name: req.body.name });
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
