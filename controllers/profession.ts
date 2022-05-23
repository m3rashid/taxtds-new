import { Request, Response } from "express";
import mongoose from "mongoose";

import Profession, { IProfession } from "../models/profession";

export const getProfessions = async (req: Request, res: Response) => {
  const professions = await Profession.find();
  return res.status(200).json({ professions });
};

export const createProfession = async (req: Request, res: Response) => {
  const profession: mongoose.HydratedDocument<IProfession> = new Profession({
    name: req.body.name,
  });
  await profession.save();
  return res.status(200).json({
    message: "Profession created",
  });
};
