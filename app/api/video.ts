import { fetchAPI } from "./api";

export const getAllVideos = (limit: number = 2, offset: number = 0) => {
  const data = fetchAPI(`camera?limit=${limit}&offset=${offset}`, "GET");
  return data;
};

export const deleteVideo = (id: string) => {
  const data = fetchAPI(`camera/${id}`, "DELETE");
  return data;
};
