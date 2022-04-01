import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file: Express.Multer.File, done) => {
    done(null, path.resolve(__dirname, "../uploads"));
  },
  filename: (req, file: Express.Multer.File, done) => {
    const ext = file.originalname.substr(file.originalname.lastIndexOf(".")); // gives the extension of the file
    done(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });
export default upload;
