import { GET_CONFIG_SUCCESS, GET_CONFIG_FAIL } from "../constants";

const initialState = {
  serviceNames: [],
  professionNames: [],
};

const configReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CONFIG_SUCCESS:
      return {
        ...state,
        serviceNames: action.payload.serviceNames,
      };
    case GET_CONFIG_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default configReducer;
