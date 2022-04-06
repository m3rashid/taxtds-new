import express, { Request, Response, NextFunction } from "express";
// import { authRateLimiter, regularRateLimiter } from "./utils/rateLimiters";

import {
  login,
  registerOne,
  registerTwo,
  getUser,
} from "./controllers/authUser";
// TOD merge all these into one (make better file structure)

import {
  add,
  addServiceName,
  deleteOne,
  edit,
  editOne,
  getOne,
  remove,
  addProfessionName,
  addReview,
} from "./controllers/service";
import checkAuth from "./middlewares/jwt.auth";
import {
  checkLogin,
  checkRegisterOne,
  checkRegisterTwo,
  checkAddService,
  checkEditService,
  checkRemoveService,
  checkAddServiceName,
  checkAddProfessionName,
  checkAddReview,
} from "./middlewares/validators";

const router = express.Router();

// Global error checker
const use =
  (check: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(check(req, res, next)).catch(next);
  };

// </endpoint> <rateLimit> <validator> <auth> <controller>
router.post("/user", /* authRateLimiter, */ checkAuth, use(getUser));
router.post(
  "/user/register-one",
  // authRateLimiter,
  checkRegisterOne,
  use(registerOne)
);
router.post(
  "/user/register-two",
  // authRateLimiter,
  checkRegisterTwo,
  use(registerTwo)
);
router.post(
  "/user/login",
  // authRateLimiter,
  checkLogin,
  use(login)
);

export default router;
