import {
  Box,
  Button,
  Loader,
  LoadingOverlay,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useMemo } from "react";
import { createVideo } from "~/api/video";
import ReactPlayer from "react-player";
import { getUserToken } from "~/utils/cookie";
import { getAllHomes } from "~/api/home";
import { useDisclosure } from "@mantine/hooks";
import { warningOptions } from "../warning-detail";
import type { WarningLevel } from "~/constants/enum";

type FormValues = {
  url: string;
  title: string;
  home: string;
  securityLevel: string;
};

const validation = yup
  .object({
    url: yup.string(),
    title: yup.string(),
    home: yup.string(),
    securityLevel: yup.string(),
  })
  .required();

export const action = async ({ request, params }: ActionArgs) => {
  const formData = await request.formData();
  const validToken = (await getUserToken(request)) as string;
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const home = formData.get("home") as string;
  const securityLevel = formData.get("securityLevel") as string;

  const body = {
    title,
    url,
    home,
    securityLevel,
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
  let limit = 1000,
    offset = 0;
  const homes = await getAllHomes(limit, offset);
  return {
    homes,
  };
};

const CreateVideo = () => {
  const data = useLoaderData();

  const homesData = data?.homes || {};

  const options = useMemo(() => {
    return (homesData?.data as []).map((item, idx) => {
      return {
        value: (item as any)?.id,
        label: (item as any)?.name,
      };
    });
  }, [homesData?.data]);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      title: "",
      url: "",
      home: "",
      securityLevel: "",
    },
    mode: "onBlur",
    resolver: yupResolver(validation),
  });
  const toast = useToast();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { handleSubmit, register, watch, setValue } = formMethods;
  const [visible, { toggle }] = useDisclosure(false);

  const onSubmit = async (data: FormValues) => {
    const { title, url, home, securityLevel } = data;
    fetcher.submit(
      {
        title,
        url,
        home,
        securityLevel,
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
      navigate(`/camera`);
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
    <Box maw={"100%"} pos="relative">
      <LoadingOverlay visible={visible} overlayBlur={5} />
      <Box>
        <Text size="xl" weight={500} sx={{ textAlign: "center" }}>
          Camera Dashboard
        </Text>

        <Box>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
              >
                <TextInput
                  label="Title"
                  placeholder="Title "
                  {...register("title")}
                />
                <TextInput
                  label="URL"
                  placeholder="URL "
                  {...register("url")}
                />

                <Select
                  label="Area"
                  placeholder="Pick one area"
                  data={options}
                  onChange={(value) => setValue("home", value as string)}
                />

                <Select
                  label="Security Level"
                  placeholder="Pick level"
                  required
                  data={warningOptions}
                  onChange={(value) =>
                    setValue("securityLevel", value as WarningLevel)
                  }
                />

                {watch("url") ? (
                  <ReactPlayer url={watch("url")} playing={false} controls />
                ) : null}

                <Box>
                  <Button
                    variant="filled"
                    color={""}
                    sx={{ width: "300px", padding: "10px", height: "50px" }}
                    type="submit"
                    onClick={toggle}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <Text sx={{ fontSize: "16px" }}>
                        {fetcher.state === "loading" ? "Creating..." : "Create"}
                      </Text>
                      {fetcher.state === "loading" ||
                      fetcher.state === "submitting" ? (
                        <Loader size={"sm"} color="dark" />
                      ) : null}
                    </Box>
                  </Button>
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateVideo;
