import express, { Request, Response, NextFunction } from "express";
// import { authRateLimiter, regularRateLimiter } from "./utils/rateLimiters";

import {
  login,
  registerOne,
  registerTwo,
  getUser,
} from "./controllers/authUser";
import {
  addListing,
  addService,
  deleteListing,
  editListing,
  getOneListing,
  remove,
  addProfession,
  addReview,
} from "./controllers/service";
import checkAuth from "./middlewares/jwt.auth";
import {
  checkLogin,
  checkRegisterOne,
  checkRegisterTwo,
  checkEditService,
  checkRemoveService,
  checkAddService,
  checkAddProfession,
  checkAddReview,
  checkAddListing,
} from "./middlewares/validators";
import upload from "./utils/multer";

const router = express.Router();

// Global error checker
const use =
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
  "/user/register-one",
  // authRateLimiter,
  use(checkRegisterOne),
  use(registerOne)
);
router.post(
  "/user/register-two",
  // authRateLimiter,
  use(checkRegisterTwo),
  use(registerTwo)
);
router.post(
  "/user/login",
  // authRateLimiter,
  use(checkLogin),
  use(login)
);

router.post(
  "/listing/create",
  checkAuth,
  use(checkAddListing),
  use(addListing)
);

// Demo
router.post("/get-quotes", (req: Request, res: Response) => res.send("Quote"));

export default router;
