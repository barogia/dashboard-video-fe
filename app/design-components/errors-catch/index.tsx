import { useCatch } from "@remix-run/react";

export function ErrorBoundaryComponent({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundaryComponent() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Something happened in Server side rendering</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
