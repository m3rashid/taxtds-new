import { google } from "googleapis";
import nodemailer from "nodemailer";

import logger from "../logger";
import appConfig from "../appConfig";
import { getHtml, IParameters } from "./helpers";

const CLIENT_ID = appConfig.gmail.clientId;
const CLIENT_SECRET = appConfig.gmail.clientSecret;
const REDIRECT_URI = appConfig.gmail.redirectUri;
const REFRESH_TOKEN = appConfig.gmail.refreshToken;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (mailData: IParameters) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      // @ts-ignore
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: `${appConfig.gmailUsername}@gmail.com`,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `"Tax TDS admin" <${appConfig.gmailUsername}@gmail.com>`,
      to: mailData.emailId,
      subject: mailData.subject,
      text: mailData.textVersion,
      html: getHtml(mailData),
    };
    const res = await transport.sendMail(mailOptions);
    logger.info(JSON.stringify(res));
    return res;
  } catch (err) {
    logger.error(JSON.stringify(err));
    return err;
  }
};

export default sendMail;
