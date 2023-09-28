import { h, text } from "https://unpkg.com/hyperapp";

export const Window = ({ child }) => {
  return h(
    "div",
    {
      style: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 20,
        width: "85%",
        backgroundColor: "black",
        height: "80px",
        opacity: 0.8,
        margin: "auto",
        borderRadius: "0.3rem",
        border: "solid 2px white",
        color: "white",
        padding: "20px",
      },
    },
    child
  );
};

export const Line = () => {
  return h(
    "div",
    {
      style: {
        position: "absolute",
        left: 30,
        right: 30,
        bottom: 20,
        backgroundColor: "white",
        height: "2px",
      },
    },
    []
  );
};

export const Bar = ({ name, prog, color }) => {
  if (prog > 90) {
    prog = 90;
    name = "???";
  }
  return h(
    "div",
    {
      style: {
        position: "absolute",
        left: 30,
        right: 30,
        bottom: 20,
        backgroundColor: color,
        height: "2px",
      },
    },
    h(
      "div",
      {
        style: {
          position: "relative",
          width: prog + "%",
        },
      },
      [
        h(
          "div",
          {
            style: {
              position: "absolute",
              right: -250,
              top: -30,
              width: "500px",
              textAlign: "center",
              color: "white",
            },
          },
          text(name)
        ),
        h(
          "div",
          { style: { position: "absolute", right: -5, top: -15 } },
          text("▾")
        ),
      ]
    )
  );
};
