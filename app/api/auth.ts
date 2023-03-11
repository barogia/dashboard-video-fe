import axios from "axios";
import { API_URL } from "~/constants/env";
import { GoogleResponse, User } from "~/models/user";

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
