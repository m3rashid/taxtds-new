export interface IAuthState {
  isAuthenticated: boolean;
  authType: string;
  token: string;
  user: any;
}

export interface IUserData {
  user: any;
}
