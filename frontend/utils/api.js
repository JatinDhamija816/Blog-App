import axios from "axios";

const SERVER_URL = "http://localhost:8000/api/v1";

export const register = async (userData) => {
  try {
    const res = await axios.post(`${SERVER_URL}/users/register`, userData, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
