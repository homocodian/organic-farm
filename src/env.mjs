import { z } from "zod";

/**
 * Specify your server-side environment variables schema here. This way you can
 * ensure the app isn't built with invalid env vars.
 */
const server = z.object({
  RAZORPAY_KEY_SECRET: z.string().min(1),
  DIRECT_DATABASE_URL: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
});

/**
 * Specify your client-side environment variables schema here. This way you can
 * ensure the app isn't built with invalid env vars. To expose them to the
 * client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().min(1),
  NODE_ENV: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge
 * runtimes (e.g. middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<
 *   keyof z.infer<typeof server> | keyof z.infer<typeof client>,
 *   string | undefined
 * >}
 */
const processEnv = {
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};

// Don't touch the part below
// --------------------------

const merged = z.object({
  ...server.shape,
  ...client.shape,
});

/**
 * @type z.infer<merged>
 */
let env = process.env;

if (!!process.env.SKIP_ENV_VALIDATION === false) {
  const isServer = typeof window === "undefined";

  const parsed = isServer
    ? merged.safeParse(processEnv) // on server we can validate all env vars
    : client.safeParse(processEnv); // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      z.treeifyError(parsed.error).errors,
    );
    throw new Error("Invalid environment variables");
  }

  /**
   * @type z.infer<merged>
   */
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        );
      return target[prop];
    },
  });
}

export { env };
