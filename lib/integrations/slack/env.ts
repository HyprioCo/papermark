import { z } from "zod";

export const envSchema = z.object({
  SLACK_APP_INSTALL_URL: z.string(),
  SLACK_CLIENT_ID: z.string(),
  SLACK_CLIENT_SECRET: z.string(),
  SLACK_INTEGRATION_ID: z.string(),
});

type SlackEnv = z.infer<typeof envSchema>;

let env: SlackEnv | undefined;

export const isSlackConfigured = () => {
  return Boolean(
    process.env.SLACK_APP_INSTALL_URL &&
      process.env.SLACK_CLIENT_ID &&
      process.env.SLACK_CLIENT_SECRET &&
      process.env.SLACK_INTEGRATION_ID,
  );
};

export const getSlackEnv = () => {
  if (env) {
    return env;
  }

  if (!isSlackConfigured()) {
    throw new Error(
      "Slack app environment variables are not configured properly.",
    );
  }

  env = envSchema.parse(process.env);

  return env;
};
