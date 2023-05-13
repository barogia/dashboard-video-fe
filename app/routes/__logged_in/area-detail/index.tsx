import { Box, Button, Text, TextInput } from "@mantine/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { createVideo, getVideo, updateVideo } from "~/api/video";
import ReactPlayer from "react-player";
import { getUserToken } from "~/utils/cookie";
import { createHome } from "~/api/home";

type FormValues = {
  name: string;
};

const validation = yup
  .object({
    name: yup.string(),
  })
  .required();

export const action = async ({ request, params }: ActionArgs) => {
  const formData = await request.formData();
  const validToken = (await getUserToken(request)) as string;
  const name = formData.get("name") as string;
  const body = {
    name,
  };

  const createArea = await createHome(validToken, body);

  if (createArea) {
    return {
      message: "success",
      data: createArea,
    };
  }

  return {
    message: "error",
    data: null,
  };
};

export const loader = async ({ context, params, request }: LoaderArgs) => {
  return null;
};

const CreateHome = () => {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
    resolver: yupResolver(validation),
  });
  const toast = useToast();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { handleSubmit, register, watch } = formMethods;

  const onSubmit = async (data: FormValues) => {
    const { name } = data;
    console.log(data);
    fetcher.submit(
      {
        name,
      },
      {
        method: "post",
      }
    );
  };

  useEffect(() => {
    if (fetcher.data?.message === "success") {
      toast({
        title: "Created successfully",
        colorScheme: "green",
        duration: 3000,
        position: "top-right",
        variant: "solid",
      });
      navigate(`/area`);
    } else if (fetcher.data?.message === "error") {
      toast({
        title: "Created failure",
        colorScheme: "red",
        duration: 3000,
        position: "top-right",
        variant: "solid",
      });
    }
  }, [fetcher?.data]);

  return (
    <Box>
      <Text size="xl" weight={500} sx={{ textAlign: "center" }}>
        Camera Dashboard
      </Text>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <TextInput
              label="Area name"
              placeholder="Area name "
              {...register("name")}
            />

            <Box>
              <Button
                variant="filled"
                color={"blue"}
                sx={{ width: "300px" }}
                type="submit"
              >
                Add new Area
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateHome;
