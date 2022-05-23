import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

export interface IForgotData {
  otp: string | number;
}

const forgotPassword = ({ otp }: IForgotData) => {
  return `
  ${header}
  <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>Follow the link given below to reset your password</td></tr>
      <tr><td><br></td></tr>
      <tr><td style="text-align:center;">Use this OTP to reset your password</td></tr>
      <tr><td><br></td></tr>
      <tr><td>${otp}</td></tr>
    </table>
    ${social}
  </body>
  </html>
  `;
};

export default forgotPassword;
