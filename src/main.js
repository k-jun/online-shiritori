import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Room } from "./room.js";

const app = new Application();
const rooms = {};

app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/static`,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

const io = new Server();

io.on("connection", (socket) => {
  socket.on("join", async (room) => {
    await socket.join(room);
    io.to(room).emit("refresh", { room, words: rooms[room].words() });
  });

  socket.on("update", ({ room, index, value }) => {
    rooms[room].update({ value, index });
    io.to(room).emit("refresh", { room, words: rooms[room].words() });
  });

  // socket.on("validate", ({ room, value, index }) => {
  //   rooms[room].setValue({ value, index });
  //   rooms[room].validate({ index });
  //   io.to(room).emit("refresh", { room: room, ...rooms[room].status() });
  // });

  socket.on("disconnect", () => {});
});

io.of("/").adapter.on("join-room", (room, id) => {
  if (room !== id && rooms[room] === undefined) {
    rooms[room] = new Room();
  }
});

io.of("/").adapter.on("delete-room", (room) => {
  delete rooms[room];
});

const handler = io.handler(async (req) => {
  return (await app.handle(req)) || new Response(null, { status: 404 });
});

await serve(handler, {
  port: Deno.env.get("PORT"),
});
