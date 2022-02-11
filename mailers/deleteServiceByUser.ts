import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

// TODO add a link to recover a service
const deleteServiceByUser = () => {
  return `
    ${header}
    <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>You deleted one of your service(s)</td></tr>
      <tr><td><br></td></tr>
      <tr><td>If you did not do it, request for recovery. Contact admin for assistance</td></tr>
      <tr><td>-----------------------------</td></tr>
      <tr><td><br></td></tr>
    </table>
    ${social}
  </body>
  </html>
  `;
};

export default deleteServiceByUser;
