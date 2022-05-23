import { CorsOptions } from "cors";

export interface IAppConfig {
  cors: CorsOptions;
  errorMessage: string | ((err: any) => string);
  mongodbUri: string;
  startLog: (port: string | number) => string;
  gmailUsername: string;
  gmailPassword: string;
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
  gmail: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    refreshToken: string;
  };
}

const devConfig: IAppConfig = {
  cors: {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  },
  errorMessage: (err: any) =>
    JSON.stringify(err.message) || "Internal Server Error",
  mongodbUri: "mongodb://localhost/taxtds",
  startLog: (port: string | number) =>
    `Server ready on: http://localhost:${port} under ${process.env
      .NODE_ENV!} environment`,
  gmailUsername: process.env.GMAIL_USERNAME!,
  gmailPassword: process.env.GMAIL_PASSWORD!,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },
  gmail: {
    clientId: process.env.GMAIL_CLIENT_ID!,
    clientSecret: process.env.GMAIL_CLIENT_SECRET!,
    redirectUri: process.env.GMAIL_REDIRECT_URI!,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN!,
  },
};

const prodConfig: IAppConfig = {
  cors: {
    origin: "https://taxtds.netlify.app",
    optionsSuccessStatus: 200,
  },
  errorMessage: "Internal Server Error",
  mongodbUri: `mongodb+srv://${process.env.PROD_DB_USERNAME!}:${process.env
    .PROD_DB_PASSWORD!}@taxtds-website.wc4rg.mongodb.net/${process.env
    .PROD_DB_NAME!}?retryWrites=true&w=majority`,
  startLog: (port: string | number) =>
    `Server ready on: https://taxtds.herokuapp.com:${port} under ${process.env
      .NODE_ENV!} environment`,
  gmailUsername: process.env.PROD_GMAIL_USER!,
  gmailPassword: process.env.PROD_GMAIL_PASS!,
  cloudinary: {
    cloudName: process.env.PROD_CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.PROD_CLOUDINARY_API_KEY!,
    apiSecret: process.env.PROD_CLOUDINARY_API_SECRET!,
  },
  gmail: {
    clientId: process.env.PROD_GMAIL_CLIENT_ID!,
    clientSecret: process.env.PROD_GMAIL_CLIENT_SECRET!,
    redirectUri: process.env.PROD_GMAIL_REDIRECT_URI!,
    refreshToken: process.env.PROD_GMAIL_REFRESH_TOKEN!,
  },
};

const appConfig =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default appConfig;
