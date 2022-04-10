import { Request, Response } from "express";

import Profession from "../models/profession";

export const getProfessions = async (req: Request, res: Response) => {
  const professions = await Profession.find().cache({ key: "professions" });
  return res.status(200).json({ professions });
};
