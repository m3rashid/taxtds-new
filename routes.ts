import express, { Request, Response, NextFunction } from "express";
// import { authRateLimiter, regularRateLimiter } from "./utils/rateLimiters";

import { getUser, getQuotes } from "./controllers/user";
import { login, register, createAccount } from "./controllers/authUser";
import {
  addListing,
  editListing,
  removeListing,
  getOneListing,
  getAllListings,
} from "./controllers/listing";
import { getProfessions } from "./controllers/profession";
import { addReview } from "./controllers/review";
import { getAllServices } from "./controllers/service";
import checkAuth from "./middlewares/jwt.auth";
import {
  checkLogin,
  checkRegisterOne,
  checkRegisterTwo,
  checkAddReview,
  checkAddListing,
} from "./validators";
import upload from "./utils/multer";

const router = express.Router();

// Global error checker
export const use =
  (check: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(check(req, res, next)).catch(next);
  };

// </endpoint> <rateLimit> <validator> <auth> <controller>

// health check
router.post(
  "/",
  use((_: Request, res: Response) => {
    return res.json({ message: "Server is OK" });
  })
);

// user authentication
router.post("/user", /* authRateLimiter, */ checkAuth, use(getUser));
router.post(
  "/user/register" /* authRateLimiter, */,
  use(checkRegisterOne),
  use(register)
);
router.post(
  "/user/create-account" /* authRateLimiter, */,
  use(checkRegisterTwo),
  use(createAccount)
);
router.post("/user/login" /* authRateLimiter, */, use(checkLogin), use(login));

// listing
router.post(
  "/listings/add" /* regularRateLimiter, */,
  checkAuth,
  use(checkAddListing),
  use(
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "gallery", maxCount: 3 },
    ])
  ),
  use(addListing)
);
router.post(
  "/listings/edit" /* regularRateLimiter, */,
  checkAuth,
  use(checkAddListing),
  use(editListing)
);
router.post(
  "/listings/remove" /* regularRateLimiter, */,
  checkAuth,
  use(removeListing)
);
router.post("/listings/one" /* regularRateLimiter, */, use(getOneListing));
router.post("/listings/all" /* regularRateLimiter, */, use(getAllListings));

// service
router.post("/services/all" /* regularRateLimiter, */, use(getAllServices));

// reviews
router.post(
  "/review/add" /* regularRateLimiter, */,
  checkAuth,
  use(checkAddReview),
  use(addReview)
);

// professions
router.post("/professions/all" /* regularRateLimiter, */, use(getProfessions));

// Demo
router.post("/get-quotes" /* regularRateLimiter, */, checkAuth, use(getQuotes));

export default router;
