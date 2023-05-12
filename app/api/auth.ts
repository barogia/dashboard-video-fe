import axios from "axios";
import { API_URL } from "~/constants/env";
import type { GoogleResponse } from "~/models/user";
import { User } from "~/models/user";
import { fetchAPI } from "./api";

export const googleAuthLoginAPI = async (
  token: string
): Promise<GoogleResponse | { statusCode: number; message: string }> => {
  try {
    const data = await fetch(`${API_URL}/google-authentication`, {
      method: "POST",
      body: JSON.stringify({
        token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await data.json();
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: `${error}` };
  }
};

export const loginAPI = async (body: any) => {
  try {
    const data = await fetch(`${API_URL}/authen/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await data.json();
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: `${error}` };
  }
};

export const registerAPI = async (body: any) => {
  const data = await fetchAPI("authen/register", "POST", "", body);
  return data;
};
