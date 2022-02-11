import { GET_ERRORS, CLEAR_ERRORS } from "../constants";

const initialState = {
  msg: "",
  status: null,
  id: null,
};

const errorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ERRORS:
      // TODO only for dev purposes
      console.log(action.payload);
      return {
        msg: action.payload.msg.message,
        status: action.payload.status,
        id: action.payload.id,
      };

    case CLEAR_ERRORS:
      return {
        msg: "",
        status: null,
        id: null,
      };

    default:
      return state;
  }
};

export default errorReducer;
