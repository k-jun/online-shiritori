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
  socket.on("join", async (name) => {
    await socket.join(name);
    refresh(name);
  });

  socket.on("update", ({ name, index, value }) => {
    rooms[name]?.update({ value, index });
    refresh(name);
  });

  socket.on("disconnect", () => {});
});

function refresh(name) {
  io.to(name).emit("refresh", {
    room: {
      ...rooms[name]?.status(),
      size: io.of("/").adapter.rooms.get(name).size,
    },
    rooms: Object.keys(rooms).map((k) => rooms[k].status()),
  });
}

io.of("/").adapter.on("join-room", (name, id) => {
  if (name !== id && rooms[name] === undefined) {
    rooms[name] = new Room({ name: name });
  }
});

io.of("/").adapter.on("delete-room", (name) => {
  delete rooms[name];
});

const handler = io.handler(async (req) => {
  return (await app.handle(req)) || new Response(null, { status: 404 });
});

await serve(handler, {
  port: Deno.env.get("PORT"),
});
