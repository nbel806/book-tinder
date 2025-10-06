import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import routes from "./routes/routes";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();
app.use(express.json());
app.use("/api", routes);

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      };
    },
  })
);
