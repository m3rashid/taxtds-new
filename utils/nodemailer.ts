import nodemailer from "nodemailer";
import {
  signup,
  review,
  resetPassword,
  quoteToAdmin,
  forgotPassword,
  deleteUser,
  deleteServiceByUser,
  deleteServiceByAdmin,
  customMail,
  ISignupData,
  IReviewData,
  IResetData,
  IQuoteData,
  IForgotData,
  ICustomData,
  sendRegisterOtp,
  ISendRegisterOtp,
  editListing,
  IEditListing,
} from "../mailerTemplates";
import logger from "./logger";
import appConfig from "./appConfig";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: appConfig.gmailUsername,
    pass: appConfig.gmailPassword,
  },
  tls: { rejectUnauthorized: false },
});

export type IMailerDataType =
  | "SIGNUP"
  | "REVIEW"
  | "RESET_PASSWORD"
  | "QUOTE_TO_ADMIN"
  | "FORGOT_PASSWORD"
  | "DELETE_USER"
  | "DELETE_LISTING_BY_USER"
  | "DELETE_LISTING_BY_ADMIN"
  | "SEND_REGISTER_OTP"
  | "CUSTOM"
  | "EDIT_LISTING";

interface IParameters {
  type: IMailerDataType;
  emailId: string;
  subject: string;
  data?: any;
}

const sendMail = (mailData: IParameters) => {
  let html: string;
  switch (mailData.type) {
    case "SIGNUP":
      html = signup(mailData.data as ISignupData);
      break;
    case "REVIEW":
      html = review(mailData.data as IReviewData);
      break;
    case "RESET_PASSWORD":
      html = resetPassword(mailData.data as IResetData);
      break;
    case "QUOTE_TO_ADMIN":
      html = quoteToAdmin(mailData.data as IQuoteData);
      break;
    case "FORGOT_PASSWORD":
      html = forgotPassword(mailData.data as IForgotData);
      break;
    case "DELETE_USER":
      html = deleteUser();
      break;
    case "DELETE_LISTING_BY_USER":
      html = deleteServiceByUser();
      break;
    case "DELETE_LISTING_BY_ADMIN":
      html = deleteServiceByAdmin();
      break;
    case "SEND_REGISTER_OTP":
      html = sendRegisterOtp(mailData.data as ISendRegisterOtp);
      break;
    case "EDIT_LISTING":
      html = editListing(mailData.data as IEditListing);
      break;
    default:
      html = customMail(mailData.data as ICustomData);
  }

  const mailOptions = {
    from: `"Tax TDS admin", ${appConfig.gmailUsername}@gmail.com`,
    to: mailData.emailId,
    subject: mailData.subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      logger.error("Error in sending mail ==> " + JSON.stringify(err));
      return;
    }
    logger.info("Message sent ==> " + JSON.stringify(info));
    return; // Optional as this needs to run asynchronous
  });
};

export default sendMail;
