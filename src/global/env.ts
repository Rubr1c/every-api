import { z } from "zod";

const envVars = z.object({
    DATABASE_URL: z.string(),
    DISCORD_BOT_TOKEN: z.string(),
    ENCRYPTION_KEY: z.string(),
});

envVars.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVars> {}
    }
}
