import fastify from "fastify";

const app = fastify();

app.get("/", async (_, reply) => {
  return { hello: "world" };
});

app
  .listen({
    port: 3001,
    host: "0.0.0.0",
  })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  });
