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
router.post(
  "/",
  use((_: Request, res: Response) => res.json({ message: "Server is OK" }))
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

// Demo
router.post("/get-quotes", (req: Request, res: Response) => res.send("Quote"));

export default router;
