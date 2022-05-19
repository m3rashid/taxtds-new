import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

export interface ISendRegisterOtp {
  email: string;
  otp: string | number;
}

const sendRegisterOtp = (data: ISendRegisterOtp) => {
  return `
  ${header}
  <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>OTP to verify yourself to Taxtds</td></tr>
      <tr><td><br></td></tr>
      <tr><td>your email and OTP are given below</td></tr>
    </table>
    <table class="inner" align="center">
      <tr><td>Email : </td><td>${data.email}</td></tr>
      <tr><td>OTP : </td><td>${data.otp}</td></tr>
    </table>
    ${social}
  </body>
  </html>
  `;
};

export default sendRegisterOtp;
