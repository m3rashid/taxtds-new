import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

export interface ICustomData {
  content: string;
  name: string;
  email: string;
}

const customMail = (data: ICustomData) => {
  return `
  ${header}
  <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>${data.content}</td></tr>
      <tr><td><br></td></tr>
      <tr><td>This message was intended for the account associated to</td></tr>
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

export default customMail;
