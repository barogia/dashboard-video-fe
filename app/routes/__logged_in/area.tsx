import { Box, Button, Table, Text } from "@mantine/core";
import ReactPlayer from "react-player";
import { deleteVideo, getAllVideos } from "~/api/video";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import Pagination from "~/design-components/Pagination";
import { DeleteButton } from "~/design-components/button/DeleteButton";
import { Toast, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteHome, getAllHomes } from "~/api/home";

export const loader = async ({ request, params }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;

  const page = +(searchParams.get("page") || 1);
  const limit = page * 4;
  const offset = (page - 1) * 4;

  const homes = await getAllHomes(limit, offset);
  return {
    homes,
  };
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const response = await deleteHome(id);
  if (response)
    return json({
      message: "success",
    });
  return json({
    message: "fail",
  });
};

export default function Area() {
  const data = useLoaderData();
  const videos = (data?.homes || {}) as { data: any[]; length: number };
  return (
    <Box sx={{ marginTop: "50px", background: "white", height: "100vh" }}>
      <Box sx={{ marginTop: "50px" }}>
        <Demo videos={videos?.data} length={videos?.length || 0} />
      </Box>
    </Box>
  );
}

interface ICameraProps {
  videos: any[];
  length: number;
}

function Demo({ videos, length }: ICameraProps) {
  const toast = useToast();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const onDeleteVideo = async (id: string) => {
    try {
      fetcher.submit(
        {
          id: id,
        },
        {
          method: "delete",
        }
      );
    } catch (error) {}
  };

  const onView = (id: string) => {
    console.log(id);
    navigate(`/area-detail/${id}`);
  };

  useEffect(() => {
    if (fetcher.data?.message === "success") {
      toast({
        title: "Area deleted successfully",
        colorScheme: "blue",
        duration: 3000,
        position: "top-right",
        // variant: "solid",
      });
    }
  }, [fetcher.data?.message]);

  const rows = videos?.map((element) => {
    return (
      <tr key={element.name}>
        <td style={{ fontWeight: 600, fontSize: 14 }}>{element.name}</td>
        <td style={{ fontWeight: 600, fontSize: 14 }}>
          {element?.camera?.length}
        </td>

        <td style={{ fontWeight: 500, fontSize: 14 }}>
          {element.activate ? "Active" : "In active"}
        </td>
        <td style={{ fontWeight: 500, fontSize: 14 }}>
          {new Date(element.createdAt).toLocaleDateString()}
        </td>
        <td>
          <Box sx={{ padding: "10px 0" }}>
            <DeleteButton
              isDelete={false}
              onFunction={() => onView(element.id)}
            />
          </Box>
          <DeleteButton isDelete onFunction={() => onDeleteVideo(element.id)} />
        </td>
      </tr>
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        gap: "30px",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Text sx={{ fontSize: "24px", fontWeight: 500 }}>Create new Area</Text>
        <Button
          variant="filled"
          color={"blue"}
          sx={{ width: "300px" }}
          onClick={() => navigate("/area-detail")}
        >
          Add new area
        </Button>
      </Box>
      <Table
        sx={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            {titles.map((title) => (
              <th
                key={title}
                style={{
                  backgroundColor: "#f3f4f6",
                  borderBottom: "1px solid #e5e7eb",
                  padding: "10px",
                  fontWeight: "bold",
                  color: "#374151",
                  textTransform: "uppercase",
                }}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination
        itemPerPage={4}
        totalItems={length}
        css={{ paddingBottom: "50px" }}
      />
    </Box>
  );
}

const titles = ["Area name", "Video", "Activate", "Created At", "Action"];
