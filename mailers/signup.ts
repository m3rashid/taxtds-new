import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

export interface ISignupData {
  name: string;
  email: string;
}

const signup = (data: ISignupData) => {
  return `
  ${header}
  <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>This is to inform you that you have successfully signed up in Tax TDS. Start listing and advertising your organisation/services</td></tr>
      <tr><td><br></td></tr>
      <tr><td>Your Signed up using the following credentials below</td></tr>
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

export default signup;
