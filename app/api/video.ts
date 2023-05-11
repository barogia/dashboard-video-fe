import { fetchAPI } from "./api";

export const getAllVideos = () => {
  const data = fetchAPI("camera", "GET");
  return data;
};
