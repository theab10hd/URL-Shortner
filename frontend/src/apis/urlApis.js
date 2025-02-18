import axios from "axios";
import { backendUrl } from "./backendUrl";

export const fetchUrls = async (userId) => {
  try {
    const response = await axios.get(`${backendUrl}/urls/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Internal server error" };
  }
};

export const createUrl = async (url) => {
  try {
    const response = await axios.post(`${backendUrl}/create`, url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Internal server error" };
  }
};

export const gotoUrl = async (shortenId) => {
  try {
    const response = await axios.get(`${backendUrl}/${shortenId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Internal server error" };
  }
};

export const deleteUrl = async (id) => {
  try {
    const response = await axios.delete(`${backendUrl}/delete`, {
      params: { id },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Internal server error" };
  }
};

export const editUrl = async (id, newUrl) => {
  try {
    const response = await axios.put(
      `${backendUrl}/edit`,
      {
        id,
        ...newUrl,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Internal server error" };
  }
};
