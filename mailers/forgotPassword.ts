import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

export interface IForgotData {
  link: string;
}

const forgotPassword = (data: IForgotData) => {
  return `
  ${header}
  <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>Follow the link given below to reset your password</td></tr>
      <tr><td><br></td></tr>
      <tr><td style="text-align:center;"><a style="color: red;"  target="_blank" href=${data.link}>Click here</a> to reset your password</td></tr>
      <tr><td><br></td></tr>
    </table>
    ${social}
  </body>
  </html>
  `;
};

export default forgotPassword;
