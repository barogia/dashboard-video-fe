import { HeaderTabs } from "~/layout/Headertab";
import { Box, Table } from "@mantine/core";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { getAllVideos } from "~/api/video";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
  const videos = await getAllVideos();
  return {
    videos,
  };
};

export default function Camera() {
  const data = useLoaderData();
  const videos = (data?.videos || {}) as { data: any[]; length: number };
  console.log(videos.data);
  return (
    <Box sx={{ marginTop: "50px" }}>
      <h1>Quan ly Video route</h1>
      <Box sx={{ marginTop: "50px" }}>
        <Demo videos={videos?.data} />
      </Box>
    </Box>
  );
}

interface ICameraProps {
  videos: any[];
}
function Demo({ videos }: ICameraProps) {
  const rows = videos.map((element) => {
    return (
      <tr key={element.name}>
        <td>
          <ReactPlayer
            url={element.url}
            playing={false}
            width={200}
            height={200}
          />
        </td>
        <td>{element.title}</td>
        <td>{element.securityLevel}</td>
        <td>{new Date(element.createdAt).toLocaleDateString()}</td>
      </tr>
    );
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>Video</th>
          <th>Title</th>
          <th>Security Level</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
