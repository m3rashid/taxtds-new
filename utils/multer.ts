import multer from "multer";
import fs from "fs";
import path from "path";

let storage = multer.diskStorage({
  destination: (req, file: Express.Multer.File, done) => {
    done(null, path.resolve(__dirname, "../uploads"));
  },
  filename: (req, file: Express.Multer.File, done) => {
    let ext = file.originalname.substr(file.originalname.lastIndexOf(".")); // gives the extension of the file
    done(null, file.fieldname + "-" + Date.now() + ext);
  },
});

export default multer({ storage: storage });
