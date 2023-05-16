import { fetchAPI } from "./api";

export const createWarning = (token: string, body: any) => {
  const data = fetchAPI(`warning`, "POST", token, body);
  return data;
};

export const getAllWarnings = (limit: number = 10, offset: number = 0) => {
  const data = fetchAPI(`warning/all?limit=${limit}&offset=${offset}`, "GET");
  return data;
};

export const getWarning = (id: string) => {
  const data = fetchAPI(`warning/${id}`, "GET");
  return data;
};

export const deleteWarning = (id: string) => {
  const data = fetchAPI(`warning/${id}`, "DELETE");
  return data;
};
