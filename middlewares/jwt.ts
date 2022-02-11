import JWT from "jsonwebtoken";
import { join } from "path";
import { readFileSync } from "fs";
import { IUser } from "../models/user";

const privateKey = readFileSync(join(__dirname, "./keys/private.pem"), "utf8");
const publicKey = readFileSync(join(__dirname, "./keys/public.pem"), "utf8");

const issueJWT = (user: IUser) => {
  const expiresIn = "1d";
  const payload = { sub: user._id, iat: Date.now() };
  const signedToken = JWT.sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
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
    console.log(err);
    return {
      valid: false,
      expired: err.message === "jwt expired",
      payload: null,
    };
  }
};

export { issueJWT, verifyJWT };
