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

export interface IListing {
  avatar: {
    url: string;
    public_id: string;
  };
  _id?: string;
  brandName: string;
  gallery: {
    url: string;
    public_id: string;
    _id: string;
  }[];
  services: string[];
  addedBy: string;
  established: string;
  tagline?: string;
  owner: string;
  addressLineOne: string;
  addressLineTwo: string;
  state: string;
  phone: number | string;
  email: string;
  deleted?: boolean;
  featured?: boolean;
  createdAt?: Date | any;
  updatedAt?: Date | any;
  __v?: number | any;
}

export interface IListingDetail {
  avatar: {
    url: string;
    public_id: string;
  };
  _id?: string;
  brandName: string;
  gallery: {
    url: string;
    public_id: string;
    _id: string;
  }[];
  services: {
    _id: string;
    name: string;
    createdAt?: Date | any;
    updatedAt?: Date | any;
    __v?: number | any;
  }[];
  addedBy: any;
  established: string;
  tagline?: string;
  owner: string;
  addressLineOne: string;
  addressLineTwo: string;
  state: string;
  phone: number | string;
  email: string;
  deleted?: boolean;
  featured?: boolean;
  createdAt?: Date | any;
  updatedAt?: Date | any;
  __v?: number | any;
  reviews: {
    _id: string;
    name: string;
    rating: number;
    review: string;
    listing: string;
    createdAt?: Date | any;
    updatedAt?: Date | any;
    __v?: number | any;
  }[];
}

export interface IPagination {
  count: number;
  hasMore: boolean;
  hasPrevious: boolean;
  currentPage: number;
  limit: number;
}
