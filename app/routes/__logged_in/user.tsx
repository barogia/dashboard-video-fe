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
import { getAllUsers } from "~/api/user";

export const loader = async ({ request, params }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;

  const page = +(searchParams.get("page") || 1);
  const limit = page * 10;
  const offset = (page - 1) * 10;

  const users = await getAllUsers(limit, offset);
  return {
    users,
  };
};

export default function UserPage() {
  const data = useLoaderData();
  const videos = (data?.users || {}) as { data: any[]; length: number };
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
  const navigate = useNavigate();

  const onView = (id: string) => {
    navigate(``);
  };

  const rows = videos.map((element) => {
    return (
      <tr key={element.name}>
        <td style={{ fontWeight: 600, fontSize: 14 }}>{element.email}</td>
        <td style={{ fontWeight: 500, fontSize: 14 }}>{element.name}</td>
        <td style={{ fontWeight: 500, fontSize: 14 }}>
          {element.isEmailConfirmed ? "Confirmed" : "Not Confirmed"}
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

const titles = ["Email", "Name", "Confirm Email", "Action"];
