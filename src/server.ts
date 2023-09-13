import fastify from "fastify";
import { appRoutes } from "./routes";

const app = fastify();

app.register(appRoutes);

app
  .listen({
    port: 3001,
    host: "0.0.0.0",
  })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  });
