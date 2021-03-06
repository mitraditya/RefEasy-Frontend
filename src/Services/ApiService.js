import axios from "axios";
import config from "../config.json";

export const register = ({
  firstName,
  lastName,
  email,
  password,
  password2,
}) => {
  return axios.post(`${config.SERVER_URL}/api/user/register/`, {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    password2: password2,
  });
};

export const login = ({ email, password }) => {
  return axios.post(`${config.SERVER_URL}/api/token/`, {
    username: email,
    password: password,
  });
};

export const logout = () => {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
};

export const getUserDetails = () => {
  return axios.get(`${config.SERVER_URL}/api/user/details/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  });
};

export const getMyReferrals = () => {
  return axios.get(`${config.SERVER_URL}/api/refer/myreferrals`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  });
};

export const refer = (jobSlug) => {
  return axios.get(
    `${config.SERVER_URL}/api/refer/generatereferral/${jobSlug}/`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
};

export const apply = (jobSlug, refLink) => {
  return axios.post(
    `${config.SERVER_URL}/api/refer/apply/${jobSlug}/`,
    {
      referral_link: refLink,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
};
