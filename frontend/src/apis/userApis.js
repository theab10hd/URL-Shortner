import axios from "axios";
import { backendUrl } from "./backendUrl";

export const signupUser = async (user) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/signup`, user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Internal server error" };
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/login`, user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Internal server error" };
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.get(`${backendUrl}/auth/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Internal server error" };
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${backendUrl}/auth/user/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Internal server error" };
  }
};

export const updateUserInfo = async (id, email, password) => {
  try {
    const response = await axios.put(
      `${backendUrl}/auth/update`,
      { id, email, password },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Error updating user info:",
      error.response?.data || error.message
    );
  }
};
