export interface IAuthState {
  isAuthenticated: boolean;
  token: string;
  user: any;
  role: "USER" | "ADMIN" | null;
}

export interface IUserData {
  user: any;
}

export interface IService {
  label: string;
  value: string;
}

export interface IProfession {
  label: string;
  value: string;
}
