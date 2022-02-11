import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

export interface IResetData {
  name: string;
  email: string;
}

const resetPassword = (data: IResetData) => {
  return `
  ${header}
  <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>This is to inform you that your password was successfully reset.</td></tr>
      <tr><td><br></td></tr>
      <tr><td>Your new credentials are below</td></tr>
    </table>
    <table class="inner" align="center">
      <tr><td>Name : </td><td>${data.name}</td></tr>
      <tr><td>Email : </td><td>${data.email}</td></tr>
    </table>
    ${social}
  </body>
  </html>
  `;
};

export default resetPassword;
