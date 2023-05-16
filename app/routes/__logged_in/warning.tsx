import { Box, Button, Table, Text } from "@mantine/core";
import { deleteVideo, getAllVideos } from "~/api/video";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Pagination from "~/design-components/Pagination";
import { DeleteButton } from "~/design-components/button/DeleteButton";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { deleteWarning, getAllWarnings } from "~/api/warning";

export const loader = async ({ request, params }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;

  const page = +(searchParams.get("page") || 1);
  const limit = page * 10;
  const offset = (page - 1) * 10;

  const videos = await getAllVideos(limit, offset);
  const warnings = await getAllWarnings(limit, offset);
  return {
    videos,
    warnings,
  };
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const response = await deleteWarning(id);

  console.log({ response });
  if (response)
    return json({
      message: "success",
    });
  return json({
    message: "fail",
  });
};

export default function Warning() {
  const data = useLoaderData();
  const warnings = (data?.warnings || {}) as { data: any[]; length: number };
  return (
    <Box sx={{ marginTop: "50px", background: "white", height: "100vh" }}>
      <Box sx={{ marginTop: "50px" }}>
        <Demo videos={warnings?.data} length={warnings?.length} />
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
    navigate(`/warning-detail/${id}`);
  };

  const changeColor = (level: string) => {
    if (level === "LOW") return "green";
    if (level === "MEDIUM") return "yellow";
    if (level === "HIGH") return "red";
  };

  useEffect(() => {
    if (fetcher.data?.message === "success") {
      toast({
        title: "Video deleted successfully",
        colorScheme: "blue",
        duration: 3000,
        position: "top-right",
      });
    }
  }, [fetcher.data?.message]);

  const rows = videos.map((element) => {
    const overTitle = element?.description;

    return (
      <tr key={element.name}>
        <td style={{ fontWeight: 600, fontSize: "16px" }}>{element.name}</td>
        <td style={{ fontWeight: 600, fontSize: 14 }}>{overTitle}</td>
        <td style={{ fontWeight: 500, fontSize: 14 }}>{element?.home?.name}</td>

        <td style={{ fontWeight: 600, fontSize: 14 }}>
          {element?.camera?.title}
        </td>
        <td style={{ fontWeight: 700, fontSize: 14 }}>
          <Box
            sx={{
              padding: "10px",
              width: "100px",
              background: "#363740",
              borderRadius: "12px",
            }}
          >
            <Text
              sx={{
                textAlign: "center",
                color: changeColor(element?.securityLevel),
              }}
            >
              {element.warningLevel}
            </Text>
          </Box>
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
        {/* <Text sx={{ fontSize: "24px", fontWeight: 500 }}>
          Create new warning
        </Text> */}
        <Button
          variant="filled"
          color={"blue"}
          sx={{ width: "300px" }}
          onClick={() => navigate("/warning-detail")}
        >
          Create warning
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
  "Warning",
  "Description",
  "Area",
  "Camera",
  "Warning Level",
  "Actions",
];
