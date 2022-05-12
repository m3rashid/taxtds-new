import nodemailer from "nodemailer";

import signup from "../mailers/signup";
import review from "../mailers/review";
import resetPassword from "../mailers/resetPassword";
import quoteToAdmin from "../mailers/quoteToAdmin";
import forgotPassword from "../mailers/forgotPassword";
import deleteUser from "../mailers/deleteUser";
import deleteServiceByUser from "../mailers/deleteServiceByUser";
import deleteServiceByAdmin from "../mailers/deleteServiceByAdmin";
import custom from "../mailers/custom";
import logger from "./logger";

const gmailUsername = process.env.NODE_ENV === "production"
  ? process.env.PROD_GMAIL_USER
  : process.env.GMAIL_USERNAME
const gmailPassword = process.env.NODE_ENV === "production"
  ? process.env.PROD_GMAIL_PASS
  : process.env.GMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: { user: gmailUsername, pass: gmailPassword },
  tls: { rejectUnauthorized: false },
});

interface IParameters {
  type: string;
  emailId: string;
  subject: string;
  data: any;
}

const Mail = (mailData: IParameters) => {
  let html: string;
  switch (mailData.type) {
    case "SIGNUP":
      html = signup(mailData.data);
      break;
    case "REVIEW":
      html = review(mailData.data);
      break;
    case "RESET_PASSWORD":
      html = resetPassword(mailData.data);
      break;
    case "QUOTE_TO_ADMIN":
      html = quoteToAdmin(mailData.data);
      break;
    case "FORGOT_PASSWORD":
      html = forgotPassword(mailData.data);
      break;
    case "DELETE_USER":
      html = deleteUser();
      break;
    case "DELETE_SERVICE_BY_USER":
      html = deleteServiceByUser();
      break;
    case "DELETE_SERVICE_BY_ADMIN":
      html = deleteServiceByAdmin();
      break;
    default:
      html = custom(mailData.data);
  }

  const mailOptions = {
    from: `"Tax TDS admin", ${gmailUsername}@gmail.com`,
    to: mailData.emailId,
    subject: mailData.subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      logger.error("Error in sending mail" + JSON.stringify(err));
      return;
    }
    logger.error("Message sent" + JSON.stringify(info));
    return; // Optional as this needs to run asynchronous
  });
};

export default Mail;
