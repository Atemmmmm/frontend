import axios from "axios";
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER_USER } from "./types";

export function loginUser() {
  return {
    type: LOGIN_USER,
  };
}

export function registerUser() {
  return {
    type: REGISTER_USER,
  };
}

export function logoutUser(){
  return{
    type: LOGIN_USER,
  };
}