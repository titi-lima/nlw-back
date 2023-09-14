import fastify from "fastify";
import { appRoutes } from "./routes";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.register(appRoutes);

app.register(fastifyCors, {
  origin: "*",
});
app
  .listen({
    port: 3001,
    host: "0.0.0.0",
  })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  });
