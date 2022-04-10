import express from "express";

// import { authRateLimiter, regularRateLimiter } from "./utils/rateLimiters";
import { use } from "./routes";
import checkAuth from "./middlewares/jwt.auth";
import checkAdmin from "./middlewares/admin";
import { deleteUser, emailUser } from "./controllers/admin/user";
import {
  deleteListing,
  featureUnfeatureListing,
} from "./controllers/admin/listing";
import {
  addService,
  deleteService,
  editService,
} from "./controllers/admin/service";
import {
  addProfession,
  editProfession,
  deleteProfession,
} from "./controllers/admin/profession";
import { register, login } from "./controllers/admin/admin";
import {
  checkEditService,
  checkDeleteService,
  checkAddService,
  checkAddProfession,
  checkAdminLogin,
  checkAdminRegister,
  checkDeleteListing,
  checkFeatureUnfeatureListing,
} from "./validators";

const router = express.Router();

// admin routes
router.post(
  "/register" /* authRateLimiter, */,
  use(checkAdminRegister),
  use(register)
);
router.post("/login" /* authRateLimiter, */, use(checkAdminLogin), use(login));

// user routes
router.post("/user/email" /* regularRateLimiter, */, checkAuth, use(emailUser));
router.post(
  "/user/delete" /* regularRateLimiter, */,
  checkAuth,
  use(checkAdmin),
  use(deleteUser)
);

// listing routes
router.post(
  "/listing/delete" /* regularRateLimiter, */,
  checkAuth,
  use(checkAdmin),
  use(checkDeleteListing),
  use(deleteListing)
);
router.post(
  "/listing/feature-unfeature" /* regularRateLimiter, */,
  checkAuth,
  use(checkAdmin),
  use(checkFeatureUnfeatureListing),
  use(featureUnfeatureListing)
);

// service routes
router.post(
  "/service/add" /* regularRateLimiter, */,
  checkAuth,
  use(checkAdmin),
  use(checkAddService),
  use(addService)
);
router.post(
  "/service/edit" /* regularRateLimiter, */,
  checkAuth,
  use(checkAdmin),
  use(checkEditService),
  use(editService)
);
router.post(
  "/service/delete" /* regularRateLimiter, */,
  checkAuth,
  use(checkAdmin),
  use(checkDeleteService),
  use(deleteService)
);

// profession routes
router.post(
  "/professions/add" /* regularRateLimiter, */,
  checkAuth,
  use(checkAdmin),
  use(checkAddProfession),
  use(addProfession)
);
router.post(
  "/professions/edit" /* regularRateLimiter, */,
  checkAuth,
  use(checkAdmin),
  use(checkAddProfession),
  use(editProfession)
);
router.post(
  "/professions/delete" /* regularRateLimiter, */,
  checkAuth,
  use(checkAdmin),
  use(deleteProfession)
);

export default router;
