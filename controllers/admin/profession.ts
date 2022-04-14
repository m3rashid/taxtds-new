import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

import Profession, { IProfession } from "../../models/profession";
import { clearHash } from "../../utils/newCache";

export const addProfession = async (req: Request, res: Response) => {
  const { name } = req.body;
  // use reqex matching to check if the same name exists in the database or not
  const profession: HydratedDocument<IProfession> = new Profession({ name });
  await profession.save();
  clearHash("professions");
  return res.status(200).json({ message: "Profession added successfully" });
};

export const editProfession = async (req: Request, res: Response) => {
  const { professionId, name } = req.body;
  const profession = await Profession.findByIdAndUpdate(professionId, { name });
  clearHash("professions");
  return res.status(200).json({
    message: "profession updated successfully",
    profession,
  });
};

export const deleteProfession = async (req: Request, res: Response) => {
  const { professionId } = req.body;
  await Profession.findByIdAndDelete(professionId);
  clearHash("professions");
  return res.status(200).json({ message: "profession deleted successfully" });
};
