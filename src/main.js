import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Room } from "./room.js";

const app = new Application();

const colors = [
  "#006400",
  "#556B2F",
  "#6B8E23",
  "#2E8B57",
  "#228B22",
  "#797D7F",
  "#A52A2A",
  "#8B4513",
  "#C04000",
  "#A0522D",
  "#D2691E",
  "#556B2F",
  "#2F4F4F",
  "#BDB76B",
  "#A9BA9D",
  "#704214",
  "#8B4F26",
  "#AF9500",
  "#A9A9A9",
  "#004953",
  "#355E3B",
  "#183A1D",
  "#2D5DA1",
  "#046307",
];
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
    refresh(room);
  });

  socket.on("update", ({ room, index, value }) => {
    rooms[room].update({ value, index });
    refresh(room);
  });

  socket.on("disconnect", () => {});
});

function refresh(room) {
  io.to(room).emit("refresh", {
    room,
    words: rooms[room].words(),
    footers: Object.keys(rooms).map((k) => rooms[k].footer()),
  });
}

io.of("/").adapter.on("join-room", (room, id) => {
  if (room !== id && rooms[room] === undefined) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    rooms[room] = new Room({ name: room, color });
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
