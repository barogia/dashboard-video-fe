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

type FormValues = {
  url: string;
  title: string;
};

const validation = yup
  .object({
    url: yup.string(),
    title: yup.string(),
  })
  .required();

export const action = async ({ request, params }: ActionArgs) => {
  const formData = await request.formData();
  const validToken = (await getUserToken(request)) as string;
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const body = {
    title,
    url,
  };

  const createdVideo = await createVideo(validToken, body);

  if (createdVideo) {
    return {
      message: "success",
      data: createdVideo,
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

const CreateVideo = () => {
  const data = useLoaderData();

  const video = data?.video?.data || {};

  const formMethods = useForm<FormValues>({
    defaultValues: {
      title: "",
      url: "",
    },
    mode: "onBlur",
    resolver: yupResolver(validation),
  });
  const toast = useToast();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { handleSubmit, register, watch } = formMethods;

  const onSubmit = async (data: FormValues) => {
    const { title, url } = data;
    console.log(data);
    fetcher.submit(
      {
        title,
        url,
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
      navigate(`/camera-detail/${fetcher.data?.data?.id}`);
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
              label="Title"
              placeholder="Title "
              {...register("title")}
            />
            <TextInput label="URL" placeholder="URL " {...register("url")} />

            <ReactPlayer url={watch("url")} playing={false} controls />

            <Box>
              <Button
                variant="filled"
                color={"blue"}
                sx={{ width: "300px" }}
                type="submit"
              >
                Create
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateVideo;
