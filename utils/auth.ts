import bcrypt from "bcrypt";
const saltRounds = 10;

const hashPassword = (password: string) => {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err || !hash) {
      return new Error();
    }
    return hash;
  });
};

const comparePassword = (password: string, hash: string) => {
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      return new Error();
    }
    return result;
  });
};

export { hashPassword, comparePassword };
