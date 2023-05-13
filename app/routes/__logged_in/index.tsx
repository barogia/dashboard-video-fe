import { Box, Text } from "@mantine/core";
import { color } from "~/config/color";
import ReactPlayer from "react-player";
import type { LoaderArgs } from "@remix-run/node";
import { getAllVideos } from "~/api/video";
import { useLoaderData } from "@remix-run/react";
import { getAllUsers } from "~/api/user";
import Pagination from "~/design-components/Pagination";

export const loader = async ({ request }: LoaderArgs) => {
  const videos = await getAllVideos();
  const users = await getAllUsers();
  return {
    videos,
    users,
  };
};

export default function Index() {
  const data = useLoaderData();
  const videos = (data?.videos || {}) as { data: any[]; length: number };
  const users = (data?.users || {}) as { data: any[]; length: number };

  return (
    <>
      <Box sx={{ background: "white" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "90px",
            justifyContent: "center",
          }}
        >
          <BoxContent title="Camera" length={videos?.length} />
          <BoxContent title="Profile" length={users?.length} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {(videos?.data as []).slice(0, 4).map((video, index) => {
            return <CameraView key={index} url={(video as any)?.url} />;
          })}
        </Box>
      </Box>
    </>
  );
}

const BoxContent = ({ length, title }: { length: number; title: string }) => {
  return (
    <Box
      sx={{
        border: "1px solid #363740",
        width: "250px",
        height: "150px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Text sx={{ fontWeight: 700, color: color.main, fontSize: "20px" }}>
        Total {title}
      </Text>
      <Text sx={{ fontWeight: 700, color: color.main, fontSize: "40px" }}>
        {length}
      </Text>
    </Box>
  );
};

const CameraView = ({ url }: { url: string }) => {
  return (
    <Box sx={{}}>
      <ReactPlayer width={"540px"} height={"300px"} url={url} playing={false} />
    </Box>
  );
};
//https://youtu.be/VPSoNx1gyQ4
