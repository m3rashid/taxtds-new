import mongoose from "mongoose";
import { Request, Response } from "express";

import Profession, { IProfession } from "../models/profession";

export const getProfessions = async (req: Request, res: Response) => {
  const professions = await Profession.find();
  return res.status(200).json({ professions });
};
