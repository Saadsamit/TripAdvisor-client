
export const envConfig = {
  serverUrl:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SERVER_HOST_URL
      : process.env.NEXT_PUBLIC_SERVER_LOCAL_URL,
};