import profession from '../models/profession';
import service from '../models/service';
import { professions } from './professions';
import { services } from './services';

export const initialSetup = async () => {
  await profession.insertMany(professions);
  await service.insertMany(services);
};
