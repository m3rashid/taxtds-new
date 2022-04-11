import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    done: DestinationCallback
  ) => {
    done(null, path.resolve(__dirname, "../uploads"));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    done: FileNameCallback
  ) => {
    const extenion = file.originalname.substr(
      file.originalname.lastIndexOf(".")
    );
    done(null, file.fieldname + "-" + Date.now() + extenion);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

export default upload;
