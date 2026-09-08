import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    BASE_URL: z.string().min(1).default("http://localhost:4000"),
    API_URL: z.string().min(1).default("http://localhost:4000/api"),
  });

  // Dynamically collect vars starting with VITE_ and strip prefix
  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (key.startsWith("VITE_")) {
      acc[key.replace("VITE_", "")] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.\n${JSON.stringify(parsedEnv.error.flatten(), null, 2)}`,
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
