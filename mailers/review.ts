import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

export interface IReviewData {
  commentedBy: string;
  rating: number | string;
  review?: string;
}

const review = (data: IReviewData) => {
  return `
  ${header}
  <body>
    <table class="main" align="center">
    ${bannerLogo}
      <tr class="content"><td>Someone posted a review on your service, see how they felt about it</td></tr>
      <tr><td><br></td></tr>
    </table>
    <table class="inner" align="center">
      <tr><td>Name : </td><td>${data.commentedBy}</td></tr>
      <tr><td>Rating : </td><td>${data.rating}</td></tr>
      ${data.review ? `<tr><td>Review : </td><td>${data.review}</td></tr>` : ""}
    </table>
    ${social}
  </body>
  </html>
  `;
};

export default review;
