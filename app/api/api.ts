import { API_URL } from "~/constants/env";

export const fetchAPI = async (url: string, method: string, token?: string) => {
  try {
    const data = await fetch(`${API_URL}/${url}`, {
      method,
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
