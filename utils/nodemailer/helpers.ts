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
} from "../../mailerTemplates";

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

export interface IParameters {
  type: IMailerDataType;
  emailId: string;
  subject: string;
  textVersion: string;
  data?: any;
}

export const getHtml = (mailData: IParameters) => {
  switch (mailData.type) {
    case "SIGNUP":
      return signup(mailData.data as ISignupData);
    case "REVIEW":
      return review(mailData.data as IReviewData);
    case "RESET_PASSWORD":
      return resetPassword(mailData.data as IResetData);
    case "QUOTE_TO_ADMIN":
      return quoteToAdmin(mailData.data as IQuoteData);
    case "FORGOT_PASSWORD":
      return forgotPassword(mailData.data as IForgotData);
    case "DELETE_USER":
      return deleteUser();
    case "DELETE_LISTING_BY_USER":
      return deleteServiceByUser();
    case "DELETE_LISTING_BY_ADMIN":
      return deleteServiceByAdmin();
    case "SEND_REGISTER_OTP":
      return sendRegisterOtp(mailData.data as ISendRegisterOtp);
    case "EDIT_LISTING":
      return editListing(mailData.data as IEditListing);
    default:
      return customMail(mailData.data as ICustomData);
  }
};
