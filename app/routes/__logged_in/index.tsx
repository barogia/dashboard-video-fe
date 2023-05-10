import { Box, Text } from "@mantine/core";
import { color } from "~/config/color";
import ReactPlayer from "react-player";
import flvjs from "flv.js";
export default function Index() {
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
          <BoxContent />
          <BoxContent />
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

const BoxContent = () => {
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
        Total Camera
      </Text>
      <Text sx={{ fontWeight: 700, color: color.main, fontSize: "40px" }}>
        64
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
