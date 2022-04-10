import { Request, Response } from "express";

import Service from "../../models/service";

export const addService = async (req: Request, res: Response) => {
  const service = new Service({ name: req.body.name });
  await service.save();
  res.sendStatus(200);
};

export const editService = async (req: Request, res: Response) => {};

export const deleteService = async (req: Request, res: Response) => {};
