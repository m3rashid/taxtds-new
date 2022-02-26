import {
  AUTH_ERROR,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_ONE_SUCCESS,
  REGISTER_TWO_SUCCESS,
  REGISTER_ONE_FAIL,
  REGISTER_TWO_FAIL,
} from "../constants";

const initialState = {
  registerOne: {
    email: "",
    success: false,
  },
  token: localStorage.getItem("taxtds-token"),
  isAuthUser: false,
  isAuthAdmin: false,
  isLoading: false,
  user: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthUser: true,
        isLoading: false,
      };

    case REGISTER_ONE_SUCCESS:
      return {
        ...state,
        registerOne: {
          email: action.payload.email,
          success: true,
        },
      };

    case REGISTER_ONE_FAIL:
      return {
        ...state,
        registerOne: {
          email: "",
          success: false,
        },
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_TWO_FAIL:
      localStorage.removeItem("taxtds-token");
      return {
        ...state,
        token: null,
        isAuthUser: false,
        isLoading: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_TWO_SUCCESS:
      localStorage.setItem("taxtds-token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthUser: true,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
