import {
  Box,
  Grid,
  Image,
  TextInput,
  Textarea,
} from "@mantine/core";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import ReactPlayer from "react-player";
import { Button, Text } from "@mantine/core";
import { getUserToken } from "~/utils/cookie";
import { getProfile } from "~/api/user";
import { getWarning } from "~/api/warning";

export const loader = async ({ context, params, request }: LoaderArgs) => {
  const { id } = params;
  const validToken = await getUserToken(request);
  const userProfile = await getProfile(validToken as string);

  const warning = await getWarning(id as string);
  return {
    warning,
    user: userProfile,
  };
};

const DetailWarning = () => {
  const data = useLoaderData();
  const warning = data?.warning?.data || {};
  const user = data?.user || {};

  console.log({ warning });

  const navigate = useNavigate();
  return (
    <Box>
      <h1 style={{ fontSize: "20px", fontWeight: 600 }}>Camera detail</h1>
      <Grid>
        <Grid.Col span={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "50px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Text sx={{ fontWeight: 600 }}>Warning name</Text>
              <TextInput
                // label="Warning Name"
                // placeholder="Warning Name "
                value={warning?.name}
                disabled
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Text sx={{ fontWeight: 600 }}> Camera</Text>
              <TextInput value={warning?.camera?.title} disabled />
              <ReactPlayer
                url={warning?.camera?.url}
                controls
                playing={false}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Text sx={{ fontWeight: 600 }}>Warning level</Text>
              <TextInput
                value={warning?.warningLevel}
                disabled
                sx={{ maxWidth: "100px" }}
              />
            </Box>

            {/* <Title order={6}>Area : {warning?.home?.name}</Title>
        <Title order={6}>Author : {warning?.user?.email}</Title>

        <Title order={6}>
          Created At : {new Date(warning?.createdAt).toLocaleDateString()}
        </Title> */}
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "50px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Text sx={{ fontWeight: 600 }}>Image</Text>
              <Image
                src={warning?.urlImage}
                maw={"600px"}
                radius="md"
                alt="Random image"
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Text sx={{ fontWeight: 600 }}>Description</Text>
              <Textarea placeholder="Description " disabled />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Text sx={{ fontWeight: 600 }}>Area</Text>
              <TextInput value={warning?.home?.name} disabled />
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default DetailWarning;

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
