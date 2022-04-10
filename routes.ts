import express, { Request, Response, NextFunction } from "express";
// import { authRateLimiter, regularRateLimiter } from "./utils/rateLimiters";

import { getUser, getQuotes } from "./controllers/user";
import { login, register, createAccount } from "./controllers/authUser";
import {
  addListing,
  editListing,
  removeListing,
  getOneListing,
} from "./controllers/listing";
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
router.post(
  "/",
  use((_: Request, res: Response) => {
    return res.json({ message: "Server is OK" });
  })
);
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

router.post(
  "/listing/create" /* regularRateLimiter, */,
  checkAuth,
  use(checkAddListing),
  use(addListing)
);
router.post(
  "/listing/edit" /* regularRateLimiter, */,
  checkAuth,
  use(checkAddListing),
  use(editListing)
);
router.post(
  "/listing/remove" /* regularRateLimiter, */,
  checkAuth,
  use(removeListing)
);
router.post("/listing/one" /* regularRateLimiter, */, use(getOneListing));
router.post("/service/all" /* regularRateLimiter, */, use(getAllServices));

router.post(
  "/review/add" /* regularRateLimiter, */,
  checkAuth,
  use(checkAddReview),
  use(addReview)
);
// Demo
router.post("/get-quotes" /* regularRateLimiter, */, checkAuth, use(getQuotes));

export default router;
