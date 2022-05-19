import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";
import appConfig from "../utils/appConfig";

export interface IEditListing {
  brandName: string;
  listingId: string;
}

const editListing = (data: IEditListing) => {
  const link = appConfig.cors.origin! + "/listings/" + data.listingId;
  return `
  ${header}
  <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>One of your listing with brand name: <b>${data.brandName}</b> was updated. See your updated listing on Taxtds at <a href="${link}">${link}</a></td></tr>
      <tr><td>-------------------------------</td></tr>
      <tr><td><br></td></tr>
    </table>
    ${social}
  </body>
  </html>
  `;
};
export default editListing;
