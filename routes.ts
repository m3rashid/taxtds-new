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
  getUserListings,
} from "./controllers/listing";
import { createProfession, getProfessions } from "./controllers/profession";
import { addReview } from "./controllers/review";
import { createService, getAllServices } from "./controllers/service";
import checkAuth from "./middlewares/jwt.auth";
import {
  checkLogin,
  checkRegisterOne,
  checkRegisterTwo,
  checkAddReview,
  checkAddListing,
  checkGetOneListing,
} from "./validators";
import upload from "./utils/multer";
import checkAdmin from "./middlewares/admin";

const router = express.Router();

// Global error checker
export const use =
  (check: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(check(req, res, next)).catch(next);
  };

// </endpoint> <rateLimit> <validator> <auth> <controller>

// health check
router.get(
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
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "galleryImgOne", maxCount: 1 },
    { name: "galleryImgTwo", maxCount: 1 },
    { name: "galleryImgThree", maxCount: 1 },
  ]),
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
router.post(
  "/listings/one" /* regularRateLimiter, */,
  use(checkGetOneListing),
  use(getOneListing)
);
router.post("/listings/all" /* regularRateLimiter, */, use(getAllListings));
router.post(
  "/listings/me" /* regularRateLimiter, */,
  checkAuth,
  use(getUserListings)
);

// service
router.post("/services/all" /* regularRateLimiter, */, use(getAllServices));
router.post(
  "/services/add" /* regularRateLimiter, */,
  checkAuth,
  checkAdmin,
  use(createService)
);

// reviews
router.post(
  "/review/add" /* regularRateLimiter, */,
  use(checkAddReview),
  use(addReview)
);

// professions
router.post("/professions/all" /* regularRateLimiter, */, use(getProfessions));
router.post(
  "/professions/add",
  /* regularRateLimiter, */ checkAuth,
  checkAdmin,
  use(createProfession)
);
// Demo
router.post("/get-quotes" /* regularRateLimiter, */, checkAuth, use(getQuotes));

export default router;
