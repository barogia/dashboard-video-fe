import { Box, Button, Text, TextInput } from "@mantine/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { getVideo, updateVideo } from "~/api/video";
import ReactPlayer from "react-player";

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
  const { id } = params;
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const body = {
    title,
    url,
  };

  const updatedVideo = await updateVideo(id as string, body);

  if (updatedVideo) {
    return {
      message: "success",
    };
  }

  return {
    message: "error",
  };
};

export const loader = async ({ context, params, request }: LoaderArgs) => {
  const { id } = params;

  const video = await getVideo(id as string);
  return {
    video,
  };
};

const EditVideo = () => {
  const data = useLoaderData();

  const video = data?.video?.data || {};

  const formMethods = useForm<FormValues>({
    defaultValues: {
      title: video?.title,
      url: video?.url,
    },
    mode: "onBlur",
    resolver: yupResolver(validation),
  });
  const toast = useToast();
  const fetcher = useFetcher();

  const { handleSubmit, register } = formMethods;

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
        title: "Updated successfully",
        colorScheme: "green",
        duration: 3000,
        position: "top-right",
        variant: "solid",
      });
    } else if (fetcher.data?.message === "error") {
      toast({
        title: "Updated failure",
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

            <ReactPlayer url={video?.url} playing={false} controls />

            <Box>
              <Button
                variant="filled"
                color={"blue"}
                sx={{ width: "300px" }}
                type="submit"
              >
                Edit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditVideo;
