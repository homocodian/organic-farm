import { hc } from "hono/client";
import { App } from "@/app/api/[...route]/route";

export const { api } = hc<App>("");
