import { Request, Response } from "express";
import mongoose from "mongoose";

import Profession, { IProfession } from "../models/profession";

export const getProfessions = async (req: Request, res: Response) => {
  const professions = await Profession.find();
  return res.status(200).json({ professions });
};
