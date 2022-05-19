import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

const deleteUser = () => {
  return `
  ${header}
  <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>This is to inform you that your account and all the services associated with that account have been deleted by the Tax TDS admin</td></tr>
      <tr><td>-------------------------------</td></tr>
      <tr><td><br></td></tr>
    </table>
    ${social}
  </body>
  </html>
  `;
};

export default deleteUser;
