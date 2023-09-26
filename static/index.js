import { h, text, app } from "https://unpkg.com/hyperapp";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { Footers } from "./footer.js";

let path = "/socket.io";
if (window.location.pathname !== "/") {
  path = `${window.location.pathname}socket.io`;
}
const socket = io(window.location.origin, { path });

const Update = ({ room, index }) => {
  return (state, event) => {
    socket.emit("update", { room, index, value: event.target.value });
    state.words[index].value = event.target.value;
    return { ...state };
  };
};

const Box = ({ room, index, value, status, note }) => {
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
            onchange: Update({ room, index }),
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
            onclick: Update({ room, index }),
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
      h("div", {}, text(note)),
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
      },
    },
    text("↓")
  );
};

const InitialState = (_state) => {
  return {
    room: "",
    words: [],
    footers: [],
  };
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
      },
    },
    [
      text("Room Name: "),
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

const Join = (state, event) => {
  socket.emit("join", event.target.value);
  return { ...state, room: event.target.value };
};

const dispatch = app({
  init: InitialState,
  view: ({ room, words, footers }) => {
    const view = [];
    if (room === "") {
      view.push(Room());
    } else {
      for (let i = 0; i < words.length; i++) {
        if (i === 0) {
          view.push(Box({ room, ...words[i] }));
          continue;
        }
        view.push(Arrow(), Box({ room, ...words[i] }));
      }
      view.push(Footers({ footers }));
    }

    return h("main", {}, [
      h("h1", {}, text("しりとり大魔王からの挑戦状")),
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
