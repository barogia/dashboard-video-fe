import { useToast } from "@chakra-ui/react";
import { Box, Table } from "@mantine/core";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { getVideoByUser } from "~/api/video";
import Pagination from "~/design-components/Pagination";
import { DeleteButton } from "~/design-components/button/DeleteButton";

export const loader = async ({ request, params }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;

  const page = +(searchParams.get("page") || 1);
  const limit = page * 10;
  const offset = (page - 1) * 10;

  const users = await getVideoByUser(limit, offset);
  return {
    users,
  };
};

export default function Analytic() {
  const data = useLoaderData();
  const users = (data?.users || {}) as { data: any[]; length: number };
  return (
    <>
      <Box sx={{ marginTop: "50px", background: "white", height: "100vh" }}>
        <Box sx={{ marginTop: "50px" }}>
          <Demo users={users?.data} length={users?.data?.length} />
        </Box>
      </Box>
    </>
  );
}

function Demo({ users, length }: { users: any[]; length: number }) {
  const navigate = useNavigate();

  const onView = (id: string) => {
    console.log(id);
    navigate(`/analytic-detail/${id}`);
  };

  const rows = users.map((element) => {
    return (
      <tr key={element.name}>
        <td style={{ fontWeight: 600, fontSize: 14 }}>{element?.email}</td>

        <td style={{ fontWeight: 500, fontSize: 14 }}>{element?.count}</td>
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
    <Box
      sx={{
        display: "flex",
        gap: "30px",
        flexDirection: "column",
        padding: "20px",
      }}
    >
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

const titles = ["Email", "Amount of videos", "Action"];
