import { Box, Button, Select, Text } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { getAllHomes } from "~/api/home";
import { useLoaderData } from "@remix-run/react";
import { getWarningsByMonth } from "~/api/warning";
import { IconPlayerTrackNext, IconPlayerTrackPrev } from "@tabler/icons-react";
import BrowserOnly from "~/global-components/BrowserOnly";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useToast } from "@chakra-ui/react";
type Props = {};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart warning by area",
    },
  },
};
export const loader = async ({ request, params }: LoaderArgs) => {
  const homes = await getAllHomes(1000, 0);
  return {
    homes,
  };
};

const StatisticPage = (props: Props) => {
  const data = useLoaderData();
  const homes = (data?.homes || {}) as { data: any[]; length: number };
  const [areaSelected, setAreaSelected] = useState(homes?.data[0]?.id);
  const [warningByMonth, setWarningByMonth] = useState([]);
  const [monthSelected, setMonthSelected] = useState(5);
  const [labels, setLabels] = useState<string[]>([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ]);
  const [dataChart, setDataChart] = useState<any>({
    labels,
    datasets: [
      {
        label: "Warning amount",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const toast = useToast();

  const areaOptions = useMemo(() => {
    return (homes?.data as []).map((item, idx) => {
      return {
        value: (item as any)?.id,
        label: (item as any)?.name,
      };
    });
  }, [homes?.data]);

  useEffect(() => {
    const fetchApi = async (id: string, time: number) => {
      const response = await getWarningsByMonth(id, time);

      if (response) setWarningByMonth(response.data);
    };
    if (areaSelected) {
      fetchApi(areaSelected, monthSelected);
    }
  }, [areaSelected, monthSelected]);

  const incMonth = (month: number) => {
    if (month === 12) setMonthSelected(1);
    else {
      const nextMonth = +month + 1;
      setMonthSelected(nextMonth);
    }
  };

  const decMonth = (month: number) => {
    if (month === 1) setMonthSelected(12);
    else {
      const prevMonth = +month - 1;
      setMonthSelected(prevMonth);
    }
  };

  useEffect(() => {
    if (warningByMonth.length > 0) {
      setDataChart({
        labels: warningByMonth?.map((item) => `Day : ${(item as any)?._id}`),
        datasets: [
          {
            label: "Warning amount",
            data: warningByMonth.map((item) => (item as any).count),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    } else {
      toast({
        title: "No warning amount in this month",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast, warningByMonth]);

  if (typeof window !== "undefined") {
    return (
      <BrowserOnly>
        <Box>
          <Box sx={{ marginTop: "50px", background: "white", height: "100vh" }}>
            <Box sx={{ marginTop: "50px", padding: "20px" }}>
              <Select
                label="Area"
                defaultValue={areaOptions[0].value}
                data={areaOptions}
                onChange={(value) => setAreaSelected(value)}
                sx={{ maxWidth: "200px" }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Button onClick={() => decMonth(monthSelected)}>
                  <IconPlayerTrackPrev />
                </Button>
                <Text sx={{ fontSize: "20px", fontWeight: 600 }}>
                  Month : {monthSelected} - 2023
                </Text>
                <Button onClick={() => incMonth(monthSelected)}>
                  <IconPlayerTrackNext />
                </Button>
              </Box>
              {/* //chart below  */}
              <BrowserOnly>
                <Bar
                  style={{ maxWidth: "90%", height: "50vh" }}
                  options={options}
                  data={dataChart}
                />
              </BrowserOnly>
            </Box>
          </Box>
        </Box>
      </BrowserOnly>
    );
  }
};

export default StatisticPage;
