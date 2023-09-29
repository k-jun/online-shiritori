import { h, text, app } from "https://unpkg.com/hyperapp";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { Window, Bar, Line } from "./window.js";
import { Background } from "./background.js";

let path = "/socket.io";
if (window.location.pathname !== "/") {
  path = `${window.location.pathname}socket.io`;
}
const socket = io(window.location.origin, { path });

const Update = ({ name, index }) => {
  return (state, event) => {
    socket.emit("update", { name, index, value: event.target.value });
    state.room.words[index].value = event.target.value;
    return { ...state };
  };
};

const Box = ({ name, index, value, status, note }) => {
  return h(
    "div",
    {
      style: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    [
      h("div", { value, style: { width: "75%", display: "flex", flex: 1 } }, [
        h(
          "input",
          {
            value,
            maxLength: 15,
            onchange: Update({ name, index }),
            style: {
              flex: 1,
              textAlign: "center",
              fontFamily: "Shinonome14B",
              fontSize: "60px",
              height: "100px",
              color:
                status === "OK" ? "green" : status === "NG" ? "red" : "black",
            },
          },
          []
        ),
        h(
          "button",
          {
            value,
            onclick: Update({ name, index }),
            style: {
              textAlign: "center",
              fontFamily: "Shinonome14B",
              fontSize: "60px",
              height: "100px",
              width: "100px",
              color:
                status === "OK" ? "green" : status === "NG" ? "red" : "black",
            },
          },
          [text(status)]
        ),
      ]),
      h(
        "div",
        {
          style: { color: "white" },
        },
        text(note)
      ),
    ]
  );
};

const Arrow = () => {
  return h(
    "div",
    {
      style: {
        height: "100px",
        width: "100px",
        fontSize: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      },
    },
    text("↓")
  );
};

const Join = (state, event) => {
  socket.emit("join", event.target.value);
  return { ...state };
};

const Room = () => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        fontSize: "60px",
        color: "white",
      },
    },
    [
      text("Team Name: "),
      h(
        "input",
        {
          maxLength: 15,
          onchange: Join,
          style: {
            flex: 1,
            textAlign: "center",
            fontFamily: "Shinonome14B",
            fontSize: "60px",
            height: "100px",
          },
        },
        []
      ),
    ]
  );
};

const Sign = ({ message }) => {
  return h(
    "div",
    {
      style: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        height: "100px",
        fontFamily: "Shinonome14B",
        fontSize: "60px",
      },
    },
    text(message)
  );
};

const InitialState = (_state) => {
  return {
    room: { name: "" },
    rooms: [],
  };
};

const dispatch = app({
  init: InitialState,
  view: ({ room, rooms }) => {
    const view = [];
    if (room.name === "") {
      view.push(Room());
      view.push(Window({ child: text("チーム名を入力して下さい。") }));
    } else {
      for (let i = 0; i < room.words.length; i++) {
        if (i === 0) {
          view.push(Box({ name: room.name, ...room.words[i] }));
          continue;
        }
        view.push(Arrow(), Box({ name: room.name, ...room.words[i] }));
      }

      if (room.words.every((e) => e.status == "OK") && room.words.length > 10) {
        view.push(Arrow(), Sign({ message: "しりとり大魔王の元へ向かえ！" }));
      }

      const bars = rooms.map((e) =>
        Bar({ name: e.name, prog: e.prog, color: "white" })
      );

      let order =
        rooms
          .sort((a, b) => (a.prog > b.prog ? -1 : 1))
          .findIndex((e) => e.name == room.name) + 1;
      if (order > rooms.length / 2 || room.prog > 90) {
        order = "?";
      }

      view.push(
        Window({
          child: [
            text(
              `チーム名: ${room.name} チーム人数: ${room.size}人 進捗度: ${room.prog}% 順位: ${order}位`
            ),
            Line(),
            ...bars,
          ],
        })
      );
    }

    return h("main", {}, [
      Background(),
      h(
        "h1",
        { style: { color: "white" } },
        text("しりとり大魔王からの挑戦状")
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0px 0px 200px",
          },
        },
        view
      ),
    ]);
  },
  node: document.getElementById("app"),
});

const Refresh = (state, payload) => {
  return { ...state, ...payload };
};

socket.on("refresh", (payload) => {
  dispatch(Refresh, payload);
});
