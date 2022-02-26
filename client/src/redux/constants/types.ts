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
}

export interface RegisterUserTypeTwo {
  name: string;
  email: string;
  phone: string;
  experience: string;
  addressLineOne: string;
  addressLineTwo: string;
  password: string;
  state: string;
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
