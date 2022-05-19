import header from "./partials/header";
import social from "./partials/social";
import bannerLogo from "./partials/bannerLogo";

export interface IQuoteData {
  companyName?: string;
  email: string;
  phone: number | string;
  query: string;
}

const quoteToAdmin = (data: IQuoteData) => {
  return `
  ${header}
  <body>
    <table class="main" align="center">
      ${bannerLogo}
      <tr class="content"><td>Someone requested for a quote from the admin</td></tr>
      <tr><td><br></td></tr>
    </table>
    <table class="inner" align="center">
      ${
        data.companyName
          ? `<tr><td>Organisation : </td><td>${data.companyName}</td></tr>`
          : ""
      }
      <tr><td>Email : </td><td>${data.email}</td></tr>
      <tr><td>Phone Number : </td><td>${data.phone}</td></tr>
      <tr><td>Query : </td><td>${data.query}</td></tr>
    </table>
    ${social}
  </body>
  </html>
  `;
};

export default quoteToAdmin;
