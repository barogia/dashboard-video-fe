import { Box, Text } from "@mantine/core";
import { color } from "~/config/color";
import ReactPlayer from "react-player";
import type { LoaderArgs } from "@remix-run/node";
import { getAllVideos } from "~/api/video";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
  const videos = await getAllVideos();
  return {
    videos,
  };
};

export default function Index() {
  const data = useLoaderData();
  const videos = (data?.videos || {}) as { data: any[]; length: number };

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
          <BoxContent length={videos?.length} />
          <BoxContent length={videos?.length} />
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
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <CameraView key={index} />
            ))}
        </Box>
      </Box>
    </>
  );
}

const BoxContent = ({ length }: { length: number }) => {
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
        Total Video
      </Text>
      <Text sx={{ fontWeight: 700, color: color.main, fontSize: "40px" }}>
        {length}
      </Text>
    </Box>
  );
};

const CameraView = () => {
  return (
    <Box
      sx={{
        background: "black",
        width: "540px",
        height: "300px",
        borderRadius: "8px",
      }}
    >
      <ReactPlayer url={"https://youtu.be/VPSoNx1gyQ4"} playing={false} />
    </Box>
  );
};
//https://youtu.be/VPSoNx1gyQ4
