import { API_URL } from "~/constants/env";
import { fetchAPI } from "./api";

export const getProfile = async (token: string) => {
  try {
    const data = await fetch(`${API_URL}/authen/userWithToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await data.json();
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: `${error}` };
  }
};

export const getUser = async (id: string) => {
  const data = await fetchAPI(`authen/detail/${id}`, "", "");
  return data;
};

export const getAllUsers = async (limit: number = 10, offset: number = 0) => {
  const data = fetchAPI(`authen/all?limit=${limit}&offset=${offset}`, "GET");
  return data;
};
