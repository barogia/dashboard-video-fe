import { fetchAPI } from "./api";

export const getAllHomes = (limit: number = 10, offset: number = 0) => {
  const data = fetchAPI(`home?limit=${limit}&offset=${offset}`, "GET");
  return data;
};

export const createHome = (token: string, body: any) => {
  const data = fetchAPI(`home`, "POST", token, body);
  return data;
};

export const getHome = (id: string) => {
  const data = fetchAPI(`home/${id}`, "GET");
  return data;
};

export const deleteHome = (id: string) => {
  const data = fetchAPI(`home/${id}`, "DELETE");
  return data;
};

export const getVideosByHome = (
  id: string,
  limit: number = 10,
  offset: number = 0
) => {
  const data = fetchAPI(
    `home/video/${id}?limit=${limit}&offset=${offset}`,
    "GET",
    "",
    ""
  );
  return data;
};
