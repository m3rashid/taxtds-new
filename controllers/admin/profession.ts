import { Request, Response } from "express";

import Profession from "../../models/profession";

export const addProfession = async (req: Request, res: Response) => {
  const { name } = req.body;
  // TODO check if the same name exists in the database or not
  const profession = new Profession({ name });
  await profession.save();
  res.send("reached");
};

export const editProfession = async (req: Request, res: Response) => {};

export const deleteProfession = async (req: Request, res: Response) => {};
