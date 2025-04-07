import type { Config } from "drizzle-kit";

export default {
	schema: "./src/server/db/schema/*.ts",
	out: "./src/server/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DIRECT_DATABASE_URL as string,
	},
	verbose: true,
	strict: true,
} satisfies Config;
