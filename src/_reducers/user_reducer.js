import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from "../_actions/types";

export default function (state = {}, action) {
    switch (action?.type) {
        case LOGIN_USER:
          return { ...state, loginSuccess: action.payload };
          break;
        case REGISTER_USER:
          return { ...state, register: action.payload };
          break;
        case LOGOUT_USER:
          return { ...state, userData: action.payload };
          break
        default:
          return state;
      }
    }