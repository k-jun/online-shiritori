import { h, text } from "https://unpkg.com/hyperapp";

export const Footers = ({ footers }) => {
  footers = footers.sort((a, b) => (a.pct < b.pct ? 1 : -1));
  footers = footers.map((e) =>
    e.pct > 90 ? { ...e, pct: 90, name: "???" } : e
  );
  const view = footers.map((e) => Footer(e));
  return h(
    "div",
    {
      style: {
        position: "sticky",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
        height: "20px",
      },
    },
    view
  );
};

export const Footer = ({ name, pct, color }) => {
  return h(
    "div",
    {
      style: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: pct + "%",
        backgroundColor: color,
        height: "20px",
      },
    },
    h(
      "div",
      {
        style: {
          position: "relative",
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
              color,
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
