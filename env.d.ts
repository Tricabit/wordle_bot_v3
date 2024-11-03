import { z } from "zod";

const envVariables = z.object({
  MONGO_URI: z.string(),
  PERSONAL_CHAT_ID: z.string(),
  GROUP_CHAT_ID: z.string(),
  PLAYERS: z.string(),
  BOT_TOKEN: z.string(),
  CYCLIC_BUCKET_NAME: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

process.env;
