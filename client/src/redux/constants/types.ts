export interface LoginUserType {
  email: string;
  password: string;
}

export interface DeleteUserTypeTwo {
  email: string;
  password: string;
  otp: string;
}

export interface RegisterUserTypeOne {
  email: string;
  password: string;
}

export interface RegisterUserTypeTwo {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  otp: string;
}

export interface ResetPasswordTypeOne {
  email: string;
  password: string;
}

export interface ResetPasswordTypeTwo {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}
