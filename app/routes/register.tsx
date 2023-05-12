import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Button,
  Stack,
  Container,
  Box,
  Anchor,
} from "@mantine/core";
import { createUserSession, getUserToken } from "~/utils/cookie";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { loginAPI, registerAPI } from "~/api/auth";
import { useCatch, useFetcher, useNavigate } from "@remix-run/react";
import BrowserOnly from "~/global-components/BrowserOnly";
import { color } from "~/config/color";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

type FormValues = {
  email: string;
  password: string;
  name: string;
};

const validation = yup
  .object({
    email: yup
      .string()
      .required("This field is required")
      .email("Email is invalid"),
    password: yup
      .string()
      .required("This field is required")
      .min(6, "Please enter more than 6 characters"),
    name: yup.string().required("This field is required"),
  })
  .required();

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const body = {
    email,
    password,
    name,
  };

  const response = await registerAPI(body);
  console.log({ response });
  if ("id" in response) {
    return {
      data: response,
    };
  }
  return {
    message: "error",
    statusCode: 502,
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  const validToken = await getUserToken(request);
  if (validToken) return redirect("/");
  return null;
};

const RegisterPage = () => {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    mode: "onBlur",
    resolver: yupResolver(validation),
  });
  const toast = useToast();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { handleSubmit, register } = formMethods;

  const onSubmit = async (data: FormValues) => {
    const { email, password, name } = data;
    fetcher.submit(
      {
        email,
        password,
        name,
      },
      {
        method: "post",
      }
    );
  };

  console.log(fetcher.data?.data);

  useEffect(() => {
    if (fetcher.data?.message === "error") {
      toast({
        title: "Already have an account with email like that",
        colorScheme: "red",
        duration: 3000,
        position: "top-right",
        variant: "solid",
      });
    }
    if (fetcher.data?.data?.id) {
      navigate("/login");

      toast({
        title:
          "Please confirm your email to have fully access to the dashboard",
        colorScheme: "green",
        duration: 3000,
        position: "top-right",
        variant: "solid",
      });
    }
  }, [fetcher?.data]);

  return (
    <BrowserOnly>
      <Box sx={{ background: color.main }}>
        <Container
          sx={{
            maxWidth: "400px",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper radius="md" p="xl" withBorder sx={{ width: "100%" }}>
            <Text size="xl" weight={500} sx={{ textAlign: "center" }}>
              Camera Dashboard
            </Text>
            <Box sx={{ marginBlock: "40px" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                  <TextInput
                    required
                    label="Email"
                    placeholder="Email address"
                    {...register("email")}
                  />
                  <TextInput
                    required
                    label="Name"
                    placeholder="Name "
                    {...register("name")}
                  />

                  <PasswordInput
                    required
                    label="Password"
                    placeholder="Your password"
                    {...register("password")}
                  />
                </Stack>

                <Box sx={{ width: "100%", marginTop: "24px" }}>
                  <Button type="submit" sx={{ width: "100%" }}>
                    {fetcher.state === "idle" ? "Register" : "Loading..."}
                  </Button>
                </Box>

                <Box>
                  <Anchor
                    component="button"
                    type="button"
                    color="dimmed"
                    size="xs"
                  >
                    Already have an account?{" "}
                    <Anchor
                      component={"span"}
                      color="dimmed"
                      size="xs"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Anchor>
                  </Anchor>
                </Box>
              </form>
            </Box>
          </Paper>
        </Container>
      </Box>
    </BrowserOnly>
  );
};

export default RegisterPage;

export function CatchBoundary() {
  const caught = useCatch();
  //  throw json({ message: "error", status: 404 }); will jump to this
  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  //throw new Error("error"); will jump this
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
