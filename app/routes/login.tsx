import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Stack,
  Container,
  Box,
  Anchor,
} from "@mantine/core";
import { createUserSession } from "~/utils/cookie";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { googleAuthLoginAPI } from "~/api/auth";
import { useCatch } from "@remix-run/react";
import BrowserOnly from "~/global-components/BrowserOnly";
import { color } from "~/config/color";

export const action = async ({ request }: ActionArgs) => {
  // const formData = await request.formData();
  // const accessToken = formData.get("accessToken") as string;

  // if (!accessToken) {
  //   throw json({
  //     message: "Error in logging in, Please try again",
  //     status: 404,
  //   });
  // }

  // const response = await googleAuthLoginAPI(accessToken);

  // if (!("accessToken" in response))
  //   throw json({
  //     message: "Error in logging in, Please try again",
  //     status: 404,
  //   });

  // return await createUserSession(response.accessToken, "/");
  return null;
};

const LoginPage = () => {
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
            {/* <Text>LOGO</Text> */}
            <Text size="xl" weight={500} sx={{ textAlign: "center" }}>
              Camera Dashboard
            </Text>
            {/* <Text>Log In</Text>
            <Text>Enter your email and password below</Text> */}
            <Box sx={{ marginBlock: "40px" }}>
              <form>
                <Stack>
                  <TextInput
                    required
                    label="Email"
                    placeholder="Email address"
                  />

                  <PasswordInput
                    required
                    label="Password"
                    placeholder="Your password"
                  />
                </Stack>

                <Box sx={{ width: "100%", marginTop: "24px" }}>
                  <Button
                    type="submit"
                    sx={{ width: "100%" }}
                    name="method"
                    value={"__form"}
                  >
                    Login
                  </Button>
                </Box>

                <Box>
                  <Anchor
                    component="button"
                    type="button"
                    color="dimmed"
                    size="xs"
                  >
                    Need help ?{" "}
                    <Anchor component={"span"} color="dimmed" size="xs">
                      Contact support
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

export default LoginPage;

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
