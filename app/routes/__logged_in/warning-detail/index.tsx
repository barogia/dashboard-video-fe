import {
  Box,
  Button,
  FileInput,
  Image,
  Loader,
  LoadingOverlay,
  Select,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { FormProvider, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { getUserToken } from "~/utils/cookie";
import { getAllHomes } from "~/api/home";
import { useDisclosure } from "@mantine/hooks";
import { WarningLevel } from "~/constants/enum";
import axios from "axios";
import { createWarning } from "~/api/warning";
import { getAllVideos } from "~/api/video";
import ReactPlayer from "react-player";

type FormValues = WarningProps;

type WarningProps = {
  name: string;
  description: string;
  urlImage: string;
  home: string;
  warningLevel: WarningLevel;
  camera: string;
};

const validation = yup
  .object({
    name: yup.string(),
    description: yup.string(),
    urlImage: yup.string(),
    home: yup.string(),
    warningLevel: yup.string(),
    camera: yup.string(),
  })
  .required();

export const action = async ({ request, params }: ActionArgs) => {
  const formData = await request.formData();
  const validToken = (await getUserToken(request)) as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const urlImage = formData.get("urlImage") as string;
  const home = formData.get("home") as string;
  const warningLevel = formData.get("warningLevel") as string;
  const camera = formData.get("camera") as string;

  const body = {
    name,
    description,
    urlImage,
    home,
    warningLevel,
    camera,
  };

  const createdWarning = await createWarning(validToken, body);

  if (createdWarning) {
    return {
      message: "success",
      data: createdWarning,
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
  const videos = await getAllVideos(limit, offset);
  return {
    homes,
    videos,
  };
};

const WarningDetailCreate = () => {
  const data = useLoaderData();
  const [video, setVideo] = useState("");
  const homesData = data?.homes || {};
  const videosData = data?.videos || {};

  const options = useMemo(() => {
    return (homesData?.data as []).map((item, idx) => {
      return {
        value: (item as any)?.id,
        label: (item as any)?.name,
      };
    });
  }, [homesData?.data]);

  const videoOptions = useMemo(() => {
    return (videosData?.data as []).map((item, idx) => {
      return {
        value: (item as any)?.id,
        label: (item as any)?.title,
        url: (item as any)?.url,
      };
    });
  }, [homesData?.data]);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      warningLevel: WarningLevel.LOW,
      home: "",
      urlImage: "",
      camera: "",
    },
    mode: "onBlur",
    resolver: yupResolver(validation),
  });
  const toast = useToast();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { handleSubmit, register, watch, setValue } = formMethods;
  const [visible, { toggle }] = useDisclosure(false);
  const [fileResponse, setFileResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", e);
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=6000&key=18309ece6f94e45e5e3da76d3f16c0e5`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response && response.data?.success) {
      setValue("urlImage", response.data?.data?.url);
      setFileResponse(response.data);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const { description, home, name, urlImage, warningLevel, camera } = data;
    fetcher.submit(
      {
        name,
        description,
        home,
        urlImage,
        warningLevel,
        camera,
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
      navigate(`/warning`);
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

  useEffect(() => {
    if (fileResponse) {
      setLoading(false);
    }
  }, [fileResponse]);

  const onVideoChange = (value: string) => {
    const video = videoOptions.find((item) => item.value === value)?.url;
    setVideo(video);
    setValue("camera", value as string);
  };

  return (
    <Box maw={"100%"} pos="relative">
      <LoadingOverlay visible={visible} overlayBlur={5} />
      <Box>
        <Text sx={{ fontSize: "24px" }} weight={500}>
          Camera Warning
        </Text>

        <Box sx={{ paddingTop: "50px" }}>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    maxWidth: "700px",
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    label="Warning Name"
                    placeholder="Warning Name "
                    {...register("name")}
                    required
                  />

                  <Textarea
                    label="Description"
                    placeholder="Description "
                    required
                    {...register("description")}
                  />

                  <Box>
                    <FileInput
                      required
                      label="Select an image of people"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {loading ? (
                      <Loader
                        color="dark"
                        size={"sm"}
                        sx={{ paddingTop: "10px" }}
                      />
                    ) : null}
                  </Box>

                  {watch("urlImage") ? (
                    <Image
                      maw={240}
                      mx="auto"
                      radius="md"
                      src={watch("urlImage")}
                      alt="Random image"
                    />
                  ) : null}

                  <Select
                    label="Area"
                    placeholder="Pick one area"
                    required
                    data={options}
                    onChange={(value) => setValue("home", value as string)}
                  />

                  <Select
                    label="Camera"
                    placeholder="Pick one camera"
                    required
                    data={videoOptions}
                    onChange={onVideoChange}
                  />

                  {watch("camera") ? (
                    <ReactPlayer playing={false} url={video} controls />
                  ) : null}

                  <Select
                    label="Warning Level"
                    placeholder="Pick level"
                    required
                    data={warningOptions}
                    onChange={(value) =>
                      setValue("warningLevel", value as WarningLevel)
                    }
                  />

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
                          {fetcher.state === "loading"
                            ? "Creating..."
                            : "Add warning"}
                        </Text>
                        {fetcher.state === "loading" ||
                        fetcher.state === "submitting" ? (
                          <Loader size={"sm"} color="dark" />
                        ) : null}
                      </Box>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default WarningDetailCreate;

export const warningOptions = [
  {
    value: WarningLevel.LOW as string,
    label: WarningLevel.LOW as string,
  },
  {
    value: WarningLevel.MEDIUM as string,
    label: WarningLevel.MEDIUM as string,
  },
  {
    value: WarningLevel.HIGH as string,
    label: WarningLevel.HIGH as string,
  },
];
