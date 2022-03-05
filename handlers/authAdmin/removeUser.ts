import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";

import User from "../../models/user";
import Service from "../../models/service";

const router = express.Router();

export default router;
