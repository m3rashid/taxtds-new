import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';

import Profession, { IProfession } from '../../models/profession';

export const addProfession = async (req: Request, res: Response) => {
  const { name } = req.body;
  // use regex matching to check if the same name exists in the database or not
  const profession: HydratedDocument<IProfession> = new Profession({ name });
  await profession.save();
  return res.status(200).json({ message: 'Profession added successfully' });
};

export const editProfession = async (req: Request, res: Response) => {
  const { professionId, name } = req.body;
  const profession = await Profession.findByIdAndUpdate(professionId, { name });
  return res.status(200).json({
    message: 'profession updated successfully',
    profession,
  });
};

export const deleteProfession = async (req: Request, res: Response) => {
  const { professionId } = req.body;
  await Profession.findByIdAndDelete(professionId);
  return res.status(200).json({ message: 'profession deleted successfully' });
};
