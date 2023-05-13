import { Box, LoadingOverlay, Skeleton, Title } from "@mantine/core";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import ReactPlayer from "react-player";
import { getVideo } from "~/api/video";
import { Button, Center, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { getUserToken } from "~/utils/cookie";
import { getProfile } from "~/api/user";

export const loader = async ({ context, params, request }: LoaderArgs) => {
  const { id } = params;
  const validToken = await getUserToken(request);
  const userProfile = await getProfile(validToken as string);

  const video = await getVideo(id as string);
  return {
    video,
    user: userProfile,
  };
};

const DetailCamera = () => {
  const data = useLoaderData();
  const video = data?.video?.data || {};
  const user = data?.user || {};
  const isAuthor = user?.id == video?.createdBy;

  const navigate = useNavigate();
  return (
    <Box>
      <h1 style={{ fontSize: "20px", fontWeight: 600 }}>Camera detail</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "50px",
        }}
      >
        <CustomButton
          onFunction={() => navigate(`/camera-detail/edit/${video?.id}`)}
          allowEdit={isAuthor}
        />
        <Title>{video?.title}</Title>
        <ReactPlayer
          url={video?.url}
          playing={false}
          controls
          fallback={<LoadingOverlay visible={true} overlayBlur={2} />}
        />
        <Title order={6}>Area : {video?.home?.name}</Title>
        <Title order={6}>Author : {video?.user?.email}</Title>

        <Title order={6}>
          Created At : {new Date(video?.createdAt).toLocaleDateString()}
        </Title>
      </Box>
    </Box>
  );
};

export default DetailCamera;

function CustomButton({
  onFunction,
  allowEdit,
}: {
  onFunction: () => void;
  allowEdit: boolean;
}) {
  const handleModal = () => {
    onFunction();
  };

  return (
    <>
      <Button
        variant="filled"
        color={"blue"}
        onClick={() => handleModal()}
        sx={{ width: "300px" }}
        disabled={!allowEdit}
      >
        Edit
      </Button>
    </>
  );
}
