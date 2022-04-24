import { HydratedDocument } from "mongoose";
import JWT from "jsonwebtoken";
import { join } from "path";
import { readFileSync } from "fs";

import { IUser } from "../models/user";
import logger from "../utils/logger";

const privateKey = readFileSync(
  join(__dirname, "../utils/keys/private.pem"),
  "utf8"
);
const publicKey = readFileSync(
  join(__dirname, "../utils/keys/public.pem"),
  "utf8"
);

const issueJWT = (user: HydratedDocument<IUser>) => {
  const expiresIn = "1d";
  const payload = { sub: user._id, iat: Date.now() };
  const signedToken = JWT.sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return { token: "Bearer " + signedToken };
};

const verifyJWT = (token: string) => {
  try {
    const extractedToken = token.split(" ")[1];
    const decoded = JWT.verify(extractedToken, publicKey, {
      algorithms: ["RS256"],
    });
    return {
      valid: true,
      expired: false,
      payload: decoded,
    };
  } catch (err: any) {
    logger.error(JSON.stringify(err));
    return {
      valid: false,
      expired: err.message === "jwt expired",
      payload: null,
    };
  }
};

export { issueJWT, verifyJWT };
