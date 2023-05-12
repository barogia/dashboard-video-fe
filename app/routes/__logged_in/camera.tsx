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

export const loader = async ({ request, params }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;

  const page = +(searchParams.get("page") || 1);
  const limit = page * 10;
  const offset = (page - 1) * 10;

  const videos = await getAllVideos(limit, offset);
  return {
    videos,
  };
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const response = await deleteVideo(id);
  if (response)
    return json({
      message: "success",
    });
  return json({
    message: "fail",
  });
};

export default function Camera() {
  const data = useLoaderData();
  const videos = (data?.videos || {}) as { data: any[]; length: number };
  return (
    <Box sx={{ marginTop: "50px", background: "white", height: "100vh" }}>
      <Box sx={{ marginTop: "50px" }}>
        <Demo videos={videos?.data} length={videos?.length} />
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
    navigate(`/camera-detail/${id}`);
  };

  useEffect(() => {
    if (fetcher.data?.message === "success") {
      toast({
        title: "Video deleted successfully",
        colorScheme: "blue",
        duration: 3000,
        position: "top-right",
        // variant: "solid",
      });
    }
  }, [fetcher.data?.message]);

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
        <td style={{ fontWeight: 600, fontSize: 14 }}>{element.title}</td>
        <td style={{ fontWeight: 500, fontSize: 14 }}>
          {element.securityLevel}
        </td>
        <td style={{ fontWeight: 500, fontSize: 14 }}>
          {new Date(element.createdAt).toLocaleDateString()}
        </td>
        <td style={{ fontWeight: 500, fontSize: 14 }}>
          {element?.createdBy?.email}
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
    <Box sx={{ display: "flex", gap: "30px", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Text sx={{ fontSize: "24px", fontWeight: 500 }}>Create new video</Text>
        <Button
          variant="filled"
          color={"blue"}
          sx={{ width: "300px" }}
          onClick={() => navigate("/camera-detail")}
        >
          Create
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
        itemPerPage={10}
        totalItems={length}
        css={{ paddingBottom: "50px" }}
      />
    </Box>
  );
}

const titles = [
  "Video",
  "Title",
  "Security Level",
  "Created At",
  "Created by",
  "Action",
];
