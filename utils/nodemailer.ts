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

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
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
    from: `"Tax TDS admin", ${process.env.GMAIL_USERNAME}@gmail.com`,
    to: mailData.emailId,
    subject: mailData.subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      console.log("Error in sending mail", err);
      return;
    }
    console.log("Message sent", info);
    return; // Optional as this needs to run asynchronous
  });
};

export default Mail;
