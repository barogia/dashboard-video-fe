import { fetchAPI } from "./api";

export const getAllVideos = (limit: number = 10, offset: number = 0) => {
  const data = fetchAPI(`camera?limit=${limit}&offset=${offset}`, "GET");
  return data;
};

export const deleteVideo = (id: string) => {
  const data = fetchAPI(`camera/${id}`, "DELETE");
  return data;
};

export const getVideo = (id: string) => {
  const data = fetchAPI(`camera/${id}`, "GET");
  return data;
};

export const updateVideo = (id: string, body: any) => {
  const data = fetchAPI(`camera/${id}`, "PATCH", "", body);
  return data;
};

export const createVideo = (token: string, body: any) => {
  const data = fetchAPI(`camera`, "POST", token, body);
  return data;
};

export const getVideoByUser = (limit: number = 10, offset: number = 0) => {
  const data = fetchAPI(
    `camera/byUsers?limit=${limit}&offset=${offset}`,
    "GET"
  );
  return data;
};

export const getVideosByUser = (
  id: string,
  limit: number = 10,
  offset: number = 0
) => {
  const data = fetchAPI(
    `camera/user/${id}?limit=${limit}&offset=${offset}`,
    "GET",
    "",
    ""
  );
  return data;
};
