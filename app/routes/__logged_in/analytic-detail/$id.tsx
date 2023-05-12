import { Box, Button, Table, Text } from "@mantine/core";
import ReactPlayer from "react-player";
import { deleteVideo, getAllVideos, getVideosByUser } from "~/api/video";
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
import { getUser } from "~/api/user";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { id } = params;
  const searchParams = new URL(request.url).searchParams;

  const page = +(searchParams.get("page") || 1);
  const limit = page * 10;
  const offset = (page - 1) * 10;

  const user = await getUser(id as string);
  const videos = await getVideosByUser(id as string, limit, offset);
  return {
    user,
    videos,
  };
};

export default function DetailAnalytic() {
  const data = useLoaderData();
  const videos = (data?.videos || {}) as { data: any[]; length: number };
  const user = data?.user || {};
  console.log(data);
  return (
    <Box sx={{ marginTop: "50px", background: "white", height: "100vh" }}>
      <Box sx={{ marginTop: "50px" }}>
        <Demo videos={videos?.data} length={videos?.length} user={user} />
      </Box>
    </Box>
  );
}

interface ICameraProps {
  videos: any[];
  length: number;
  user: any;
}

function Demo({ videos, length, user }: ICameraProps) {
  const toast = useToast();
  const fetcher = useFetcher();
  const navigate = useNavigate();

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
        <Text sx={{ fontSize: "24px", fontWeight: 500 }}>
          User Profile : {user?.email}
        </Text>
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
