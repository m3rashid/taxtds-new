export interface IAuthState {
  isAuthenticated: boolean;
  authType: string;
  token: string;
  user: any;
  who: "user" | "admin";
}

export interface IUserData {
  user: any;
}
