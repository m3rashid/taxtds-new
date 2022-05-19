import customMail, { ICustomData } from "./custom";
import deleteServiceByAdmin from "./deleteServiceByAdmin";
import deleteServiceByUser from "./deleteServiceByUser";
import deleteUser from "./deleteUser";
import forgotPassword, { IForgotData } from "./forgotPassword";
import resetPassword, { IResetData } from "./resetPassword";
import quoteToAdmin, { IQuoteData } from "./quoteToAdmin";
import review, { IReviewData } from "./review";
import signup, { ISignupData } from "./signup";
import sendRegisterOtp, { ISendRegisterOtp } from "./sendRegisterOtp";
import editListing, { IEditListing } from "./editListing";

export {
  customMail,
  deleteServiceByAdmin,
  deleteServiceByUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  quoteToAdmin,
  review,
  signup,
  sendRegisterOtp,
  editListing,
  ICustomData,
  IForgotData,
  IResetData,
  IQuoteData,
  IReviewData,
  ISignupData,
  ISendRegisterOtp,
  IEditListing,
};
