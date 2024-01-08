import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CYPRESS_USER_EMAIL: z.string(),
    CYPRESS_USER_PASSWORD: z.string(),
  },

  client: {
    NEXT_PUBLIC_EVEREST_AUTH_SERVER: z.string(),
    NEXT_PUBLIC_EVEREST_RESOURCES_SERVER: z.string(),
    NEXT_PUBLIC_TINY_MCE_API_KEY: z.string(),
    NEXT_PUBLIC_TESTE: z.string(),
  },

  runtimeEnv: {
    CYPRESS_USER_EMAIL: process.env.CYPRESS_USER_EMAIL,
    CYPRESS_USER_PASSWORD: process.env.CYPRESS_USER_PASSWORD,

    NEXT_PUBLIC_EVEREST_AUTH_SERVER:
      process.env.NEXT_PUBLIC_EVEREST_AUTH_SERVER,

    NEXT_PUBLIC_EVEREST_RESOURCES_SERVER: 
      process.env.NEXT_PUBLIC_EVEREST_RESOURCES_SERVER,

    NEXT_PUBLIC_TINY_MCE_API_KEY:
      process.env.NEXT_PUBLIC_TINY_MCE_API_KEY,

    NEXT_PUBLIC_TESTE: process.env.NEXT_PUBLIC_TESTE,
  },
});