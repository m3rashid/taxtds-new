import { Request, Response, Router as expressRouter } from "express";
const router = expressRouter();
// import mongoose from "mongoose";

import User from "../models/user";
import Listing from "../models/listing";
import checkAuth from "../middlewares/jwt.auth";
import logger from "../utils/logger";

// TODO make a middleware for jwt signing and verification
router.get("/user", checkAuth, async (req: Request, res: Response) => {
  const userId = req.user;
  if (!userId) {
    return res.status(400).json({
      message: "Unauthorized Request",
    });
  }
  try {
    const user = await User.find({ _id: userId });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const userServices = await Listing.find({ addedBy: userId });

    return res.status(200).json({
      user: user,
      userServices: userServices,
      message: "Successful",
    });
  } catch (err) {
    logger.error(JSON.stringify(err));
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
