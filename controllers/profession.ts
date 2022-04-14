import { Request, Response } from "express";

import Profession from "../models/profession";
import { useCache } from "../utils/newCache";

export const getProfessions = async (req: Request, res: Response) => {
  const query = Profession.find();
  const professions = useCache("professions", query);
  return res.status(200).json({ professions });
};
