import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

const deleteListingByAdmin = () => {
  return `
  ${header}
  <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>This is to inform you that your one of your listings associated with this account has been deleted by the Tax TDS admin. Log in your account to know more</td></tr>
      <tr><td>-------------------------------</td></tr>
      <tr><td><br></td></tr>
    </table>
    ${social}
  </body>
  </html>
  `;
};

export default deleteListingByAdmin;
