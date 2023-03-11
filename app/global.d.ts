declare global {
  const ENV: {
    VITE_GOOGLE_CLIENT_ID: string;
    VITE_GOOGLE_CLIENT_SECRET: string;
    API_URL: string;
  } & Record<string, string>;
}

export {};
