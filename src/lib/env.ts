import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  NEXT_PUBLIC_API_URL: z.string(),
  NEXT_PUBLIC_ADMIN_EMAIL: z.email({ error: 'email is missing' }),
  ADMIN_PASSWORD: z.string(),
});

function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const env = validateEnv();

const appConfig = {
  node_env: env.NODE_ENV,
  api_url: env.NEXT_PUBLIC_API_URL,
  admin_email: env.NEXT_PUBLIC_ADMIN_EMAIL,
  admin_password: env.ADMIN_PASSWORD,
};

export default appConfig;
